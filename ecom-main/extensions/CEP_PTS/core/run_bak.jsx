$.evalFile("C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/lib/Batch Mockup Smart Object Replacement.jsx");

// Identical output settings for every mockup
var output = {
  // Path prefix: "$/" points to the parent folder of this script. 
  // You could also use "./", which points to the parent folder of the psd mockup. 
  // The only place where you can't use "./" is in the "mockupPath"
    path: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/outputs',
    format: 'jpg', // 'jpg', 'png', 'tif', 'psd', 'pdf'
    folders: false, // Files will be grouped by folders inside the output folder
    filename: '@input/@mockup - @input',
    replace: ['T-Shirt'], // Replace these strings in the filename
};

mockups([
    // Mockup #0
    {
        output: output, // You can of course give individual output settings for each mockup if you want...
        mockupPath: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/psd/psd0.psd',
        smartObjects: [
            {
                target: 'YOUR DESIGN HERE! ', // Target layer name. I've renamed all of the smart object names in the mockup psd because you need the layer names to be unique. The prefix: "@" is just an easy way to make sure it's unique.
                input: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/designs',  // Look for image files from this input folder...
                resize: 'fit',
                align: 'center center',
            }
        ]
    },
    // Mockup #1
    {
        output: output, // You can of course give individual output settings for each mockup if you want...
        mockupPath: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/psd/psd1.psd',
        smartObjects: [
            {
                target: 'YOUR DESIGN HERE! ', // Target layer name. I've renamed all of the smart object names in the mockup psd because you need the layer names to be unique. The prefix: "@" is just an easy way to make sure it's unique.
                input: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/designs',  // Look for image files from this input folder...
                resize: 'fit',
                align: 'center center',
            }
        ]
    },
    // Mockup #2
    {
        output: output, // You can of course give individual output settings for each mockup if you want...
        mockupPath: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/psd/psd2.psd',
        smartObjects: [
            {
                target: 'YOUR DESIGN HERE! ', // Target layer name. I've renamed all of the smart object names in the mockup psd because you need the layer names to be unique. The prefix: "@" is just an easy way to make sure it's unique.
                input: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/designs',  // Look for image files from this input folder...
                resize: 'fit',
                align: 'center center',
            }
        ]
    },
    // Mockup #3
    {
        output: output, // You can of course give individual output settings for each mockup if you want...
        mockupPath: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/psd/psd3.psd',
        smartObjects: [
            {
                target: 'YOUR DESIGN HERE! ', // Target layer name. I've renamed all of the smart object names in the mockup psd because you need the layer names to be unique. The prefix: "@" is just an easy way to make sure it's unique.
                input: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/designs',  // Look for image files from this input folder...
                resize: 'fit',
                align: 'center center',
            }
        ]
    },
    // Mockup #4
    {
        output: output, // You can of course give individual output settings for each mockup if you want...
        mockupPath: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/psd/psd4.psd',
        smartObjects: [
            {
                target: 'YOUR DESIGN HERE! ', // Target layer name. I've renamed all of the smart object names in the mockup psd because you need the layer names to be unique. The prefix: "@" is just an easy way to make sure it's unique.
                input: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/designs',  // Look for image files from this input folder...
                resize: 'fit',
                align: 'center center',
            }
        ]
    },
    // Mockup #5
    {
        output: output, // You can of course give individual output settings for each mockup if you want...
        mockupPath: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/psd/psd5.psd',
        smartObjects: [
            {
                target: '4x5 YOUR DESIGN HERE! ', // Target layer name. I've renamed all of the smart object names in the mockup psd because you need the layer names to be unique. The prefix: "@" is just an easy way to make sure it's unique.
                input: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/designs',  // Look for image files from this input folder...
                resize: 'fit',
                align: 'center center',
            }
        ]
    },
    // Mockup #6
    {
        output: output, // You can of course give individual output settings for each mockup if you want...
        mockupPath: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/psd/psd6.psd',
        smartObjects: [
            {
                target: 'YOUR DESIGN HERE! ', // Target layer name. I've renamed all of the smart object names in the mockup psd because you need the layer names to be unique. The prefix: "@" is just an easy way to make sure it's unique.
                input: 'C:/Program Files/Common Files/Adobe/CEP/extensions/CEP_PTS/data/mockups/Poster_1/designs',  // Look for image files from this input folder...
                resize: 'fit',
                align: 'center center',
            }
        ]
    },
]);

