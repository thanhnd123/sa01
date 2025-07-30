let globalConfig = null;
const fs = require('fs');
const root_dir = "C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS";
const loadConfig = async () => {
  try {
    const response = await fetch('../config.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    globalConfig = await response.json();
    return globalConfig;
  } catch (error) {
    console.error('Error loading config:', error);
    return null;
  }
};
const downloadPNG = async (mockup_name, png_url, save_path) => {
  try {
    const response = await fetch(png_url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const dir = save_path.substring(0, save_path.lastIndexOf('/'));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(save_path, buffer);
    return true;
  } catch (error) {
    console.error('Error downloading PNG:', error);
    return false;
  }
};

async function processActions(actions) {
  try {
    console.log('actions:', actions);
    for (const action of actions) {
      await process_action(action);
    }
  } catch (error) {
    console.error('Error processing actions:', error);
    throw error;
  }
}

async function process_action(action) {
  // start
  // download png
  // create banners
  // upload to s3
  // send result
  // clean up(png, folder result)
  //end
  const png_dir = root_dir + "/data/processing/" + action.ideal_id + "/png";
  const png_path = root_dir + "/data/processing/" + action.ideal_id + "/png/" + action.ideal_id + ".png";
  const is_download_success = await downloadPNG(action.mockup_name, action.png, png_path);
  if (is_download_success) {
    // create banners
    const is_create_banners_success = await create_banners(png_dir, action);
    // if(is_create_banners_success){
    //   // upload to s3
    // }
  }
}

const create_banners = (png_dir, action) => {
  const product_type = action.product_type;
  const mockups = action.mockups;
  try {
    // Tạo thư mục output nếu chưa tồn tại
    const outputDir = root_dir + "/data/processing/" + action.ideal_id + "/banner_outputs";
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Xử lý từng mockup
    let is_create_banners_success = false;
    let completed_mockups = 0;
    const total_mockups = mockups.length;

    for (let index = 0; index < mockups.length; index++) {
      const mockup = mockups[index];
      // const mockupPath = root_dir + "/data/mockups/" + product_type + "/" + mockup.mockup_name + ".psd";
      const mockupPath = root_dir + "/data/mockups/" + product_type + "/" + mockup.name + ".psd";
      const outputPath = outputDir;
      // Gọi script run.jsx với tham số
      const csInterface = new CSInterface();
      const script_content = `
        (function() {
          try {
            $.evalFile("${root_dir}/core/run.jsx");
            createBanner("${mockupPath}", "${png_dir}/", "${outputPath}/");
            return '{"message":"Script executed successfully", "status": 1}';
          } catch(e) {
            return '{"message":"Error: ' + e.message + '", "status": 0, "error_line": ' + (e.line || 0) + '}';
          }
        })();
      `;

      csInterface.evalScript(script_content, (result) => {
        try {
          result = JSON.parse(result);
          if (result.status > 0) {
            completed_mockups++;
            console.log(`Mockup ${index + 1}/${total_mockups} completed successfully`);
          } else {
            console.error(`Mockup ${index + 1}/${total_mockups} failed:`, result.message);
          }

          // Kiểm tra xem tất cả mockups đã hoàn thành chưa
          if (completed_mockups === total_mockups) {
            is_create_banners_success = true;
            check_done(action);
          } else if (completed_mockups + (total_mockups - index - 1) < total_mockups) {
            // Nếu số mockups đã hoàn thành + số mockups còn lại < tổng số, có nghĩa là có lỗi
            is_create_banners_success = false;
          }
        } catch (parseError) {
          console.error('Error parsing result:', parseError);
          is_create_banners_success = false;
        }
      });
    };
    return true;
  } catch (error) {
    console.error(`Error creating banners: ${error.message}`);
    return false;
  }
}

const check_done = (action) => {
  const banner_folder = root_dir + "/data/processing/" + action.ideal_id + "/banner_outputs/" + action.ideal_id;
  const expected_total_banner_file = action.mockups.length;
  console.log('expected_total_banner_file:', expected_total_banner_file);
  if (fs.existsSync(banner_folder)) {
    const total_banner_file = fs.readdirSync(banner_folder).length;
    console.log('total_banner_file:', total_banner_file);
    if (total_banner_file === expected_total_banner_file) {
      setTimeout(() => {
        setup_result(action);
      }, 1000);
    }
    else {
      console.log("Mockup chưa hoàn tất!");
      setTimeout(() => {
        check_done(action);
      }, 3000);
    }
  }
}

const setup_result = async (action) => {
  console.log('setup_result:');
  const banner_folder = root_dir + "/data/processing/" + action.ideal_id + "/banner_outputs/" + action.ideal_id;
  const date = get_date_string();
  const files = fs.readdirSync(banner_folder);
  action.banners = [];

  // Cách 1: Upload tuần tự (hiện tại)
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const filePath = banner_folder + '/' + file;
    const fileUrl = await upload_to_s3(filePath, "ideals/products/" + action.ideal_id + "/" + action.product_type + "/" + file);
    if (index == 0) {
      action.main_image = fileUrl;
    }
    else {
      action.banners.push(fileUrl);
    }
  };
  await send_action_to_server([action]);

  // Xóa các folder con trong outputs sau khi đã upload xong
  const ideal_path = root_dir + "/data/processing/" + action.ideal_id;
  if (fs.existsSync(ideal_path)) {
    fs.rmSync(ideal_path, { recursive: true, force: true });
  }
}
const send_action_to_server = (actions) => {
  const url = globalConfig.server.baseUrl + globalConfig.server.endpoints.response_results;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(actions)
  });
}


const get_date_string = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const upload_to_s3 = (file, aws_file_path) => {
  AWS.config.update({
    accessKeyId: globalConfig.aws.AWS_ACCESS_KEY_ID,
    secretAccessKey: globalConfig.aws.AWS_SECRET_ACCESS_KEY,
    region: globalConfig.aws.AWS_DEFAULT_REGION
  });
  const s3 = new AWS.S3();
  const fileContent = fs.readFileSync(file);
  const params = {
    Bucket: globalConfig.aws.bucket,
    Key: aws_file_path,
    Body: fileContent
  };

  try {
    s3.upload(params).promise();
    const fileUrl = `https://${globalConfig.aws.bucket}.s3.amazonaws.com/${aws_file_path}`;
    return fileUrl;
  } catch (err) {
    console.error(`Error uploading ${file} to S3:`, err);
    throw err;
  }
}


// main
window.addEventListener('DOMContentLoaded', async function () {
  (function () {
    console.log('DOMContentLoaded');
    try {
      const csInterface = new CSInterface();

      // Enable debug logging
      csInterface.evalScript('$.level = 2;');

      let fetchInterval;
      let isProcessing = false;

      // Load config first
      loadConfig().then(() => {
        // Start fetching actions after config is loaded
        fetchActions();
        // Set up interval to fetch every 10 seconds
        fetchInterval = setInterval(fetchActions, 10 * 1000);
      });

      // Function to fetch actions from server
      function fetchActions() {
        if (!globalConfig) {
          console.error('Config not loaded yet');
          return;
        }

        if (isProcessing) {
          console.log('Still processing previous actions, skipping fetch');
          return;
        }

        try {
          const url = globalConfig.server.baseUrl + globalConfig.server.endpoints.actions;
          fetch(url + "?node=" + globalConfig.infor.node_name)
            .then(response => response.json())
            .then(res => {
              const data = res.data;
              console.log('data:', res.data);
              if (data && data.length > 0) {
                // Stop fetching while processing actions
                if (fetchInterval) {
                  clearInterval(fetchInterval);
                }
                isProcessing = true;
                console.log('Processing actions:', data);
                // Process actions here
                processActions(data).then(() => {
                  isProcessing = false;
                  // Restart fetching after processing is done
                  console.log('Restarting fetch interval after processing');
                  fetchInterval = setInterval(fetchActions, 20 * 1000);
                  console.log('Restarted fetch interval after processing');
                });
              }
            })
            .catch(error => {
              console.error('Error fetching actions:', error);
              // Clear interval when fetch fails
              if (fetchInterval) {
                clearInterval(fetchInterval);
                console.log('Cleared fetch interval due to error');
              }
            });
        } catch (error) {
          console.error('Error in fetchActions:', error);
          // Clear interval when fetch fails
          if (fetchInterval) {
            clearInterval(fetchInterval);
            console.log('Cleared fetch interval due to error');
          }
        }
      }

      // Function to process actions

    } catch (error) {
      console.error('Fatal error during initialization:', error);
      document.getElementById('result').innerHTML = 'Lỗi khởi tạo: ' + error.message;
    }
  })();
});

