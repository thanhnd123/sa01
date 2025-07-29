const root_dir = "C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS";
$.evalFile(root_dir+"/core/lib/Batch Mockup Smart Object Replacement.jsx");

// Hàm tạo banner với tham số động - global function
function createBanner(mockupPath, inputPath, outputPath) {
    // Cấu hình đầu ra cho banner
    var output = {
        path: outputPath, // Đường dẫn lưu banner được truyền vào
        format: 'jpg', // 'jpg', 'png', 'tif', 'psd', 'pdf'
        folders: false, // Files sẽ được nhóm theo thư mục trong thư mục output
        filename: '@input/@mockup - @input',
        replace: [], // Thay thế các chuỗi này trong tên file
    };

    mockups([
        // Mockup với tham số động
        {
            output: output,
            mockupPath: mockupPath, // Đường dẫn mockup được truyền vào
            smartObjects: [
                {
                    target: 'YOUR DESIGN HERE! ', // Tên layer đích
                    input: inputPath,  // Thư mục chứa file thiết kế được truyền vào
                    resize: 'fit',
                    align: 'center center',
                }
            ]
        }
    ]);
}

