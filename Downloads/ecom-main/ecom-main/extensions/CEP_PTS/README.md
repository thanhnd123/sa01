# PTS Extension

Adobe CEP Extension for Adobe Creative Cloud applications.

## Setup Instructions

### 1. Install Extension

Copy the entire `CEP_PTS` folder to Adobe CEP extensions directory:

**Windows:**

```
C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\
```

**macOS:**

```
/Library/Application Support/Adobe/CEP/extensions/
```

### 2. Enable Debug Mode

#### Windows:

1. Open Registry Editor (regedit.exe)
2. Navigate to: `HKEY_CURRENT_USER\Software\Adobe\CSXS.11`
3. Create new String value:
   - Name: `PlayerDebugMode`
   - Value: `1`

#### macOS:

1. Open Terminal
2. Run command:

```bash
defaults write com.adobe.CSXS.11 PlayerDebugMode 1
```

### 3. Restart Adobe Application

Close and reopen your Adobe application (Photoshop, Illustrator, etc.)

### 4. Access Extension

1. Go to Window > Extensions
2. Select "PTS Extension"

## Debugging

### JavaScript Debugging

1. Open Developer Tools in extension:
   - Windows: `Ctrl + Alt + I`
   - macOS: `Cmd + Option + I`
2. Check Console tab for JavaScript errors

### JSX Debugging

1. Open ExtendScript Toolkit
2. Connect to your Adobe application
3. Load the JSX file from `jsx/hostscript.jsx`

## Troubleshooting

If extension doesn't appear:

1. Verify extension folder is in correct location
2. Check folder permissions
3. Confirm PlayerDebugMode is enabled
4. Check extension console for errors

## Supported Applications

- Photoshop (PHSP)
- Photoshop Extended (PHXS)
- InDesign (IDSN)
- Illustrator (ILST)
- Premiere Pro (PPRO)
- Prelude (PRLD)
- Flash Pro (FLPR)

## Development

### File Structure

```
CEP_PTS/
├── .debug
├── CSXS/
│   └── manifest.xml
├── css/
│   └── style.css
├── js/
│   └── main.js
├── jsx/
│   └── hostscript.jsx
└── index.html
```

### Making Changes

1. Edit files as needed
2. Restart Adobe application to see changes
3. Use Developer Tools to debug

## Requirements

- Adobe Creative Cloud application
- CEP 6.0 or higher
- Windows 7+ or macOS 10.9+
