# Accessibility Widget

A configurable accessibility tool for websites that provides various assistive functions for people with disabilities.

> **German version available:** [README-accessibility-widget.md](README-accessibility-widget.md)

## Features

- **High Contrast**: Changes colors for better readability
- **Invert Colors**: Inverts all colors on the page
- **Highlight Links**: Shows all clickable elements clearly
- **Reading Guide**: Adds horizontal lines for better orientation
- **Text Size**: Increases or decreases text size
- **Reduce Motion**: Disables animations for sensitive users
- **Read Page**: Reads the entire page content aloud
- **Read Element**: Reads individual elements when clicked
- **Automatic Settings Storage**: Saves user settings in localStorage

## Installation

1. Download the entire `accessibility-widget` folder
2. Add the CSS file to the `<head>` of your HTML file
3. Add the JS file before the closing `</body>` tag
4. Initialize the widget with your desired configuration

### Folder Structure
```
accessibility-widget/
├── accessibility-widget.js          # Main JavaScript file
├── accessibility-widget.css         # Main CSS file (includes local fonts)
├── accessibility-widget-example.html # Example implementation
├── README-accessibility-widget.md   # Documentation
├── integration-guide.md             # Quick integration guide
└── fonts/
    ├── poppins.css                  # Local Poppins font CSS
    ├── poppins-300.woff2           # Poppins Light
    ├── poppins-400.woff2           # Poppins Regular
    ├── poppins-600.woff2           # Poppins SemiBold
    ├── poppins-700.woff2           # Poppins Bold
    ├── fontawesome.css              # Font Awesome CSS (local)
    ├── all.min.css                  # Font Awesome CSS (local)
    ├── fa-solid-900.woff2          # Font Awesome Solid Icons
    ├── fa-regular-400.woff2        # Font Awesome Regular Icons
    └── fa-brands-400.woff2         # Font Awesome Brand Icons
```

### Example Integration

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    
    <!-- Accessibility Widget CSS (includes local Poppins font and Font Awesome) -->
    <link rel="stylesheet" href="accessibility-widget/accessibility-widget.css">
</head>
<body>
    <!-- Your page content -->
    
    <!-- Accessibility Widget JS -->
    <script src="accessibility-widget/accessibility-widget.js"></script>
    
    <!-- Initialize widget -->
    <script>
        const accessibilityWidget = new AccessibilityWidget({
            position: 'bottom-right',
            buttonColor: '#007bff',
            showOnLoad: true
        });
    </script>
</body>
</html>
```

## Configuration

The widget can be fully configured:

```javascript
const widget = new AccessibilityWidget({
    // Button position
    position: 'bottom-right', // 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'
    
    // Colors
    buttonColor: '#007bff',
    buttonHoverColor: '#0056b3',
    
    // Sizes
    panelWidth: 300,
    buttonSize: 50,
    
    // Margins
    margin: 20,
    
    // Z-Index
    zIndex: 9999,
    
    // Show automatically on load
    showOnLoad: true,
    
    // Language
    language: 'de'
});
```

### Available Configuration Options

| Option | Type | Default | Description |
|--------|-----|----------|--------------|
| `position` | string | `'bottom-right'` | Position of the widget button (top-left, top-center, top-right, middle-left, middle-right, bottom-left, bottom-center, bottom-right) |
| `buttonColor` | string | `'#007bff'` | Button color |
| `buttonHoverColor` | string | `'#0056b3'` | Button hover color |
| `panelWidth` | number | `300` | Panel width in pixels |
| `buttonSize` | number | `50` | Button size in pixels |
| `margin` | number | `20` | Distance from edge in pixels |
| `zIndex` | number | `9999` | Z-Index of the widget |
| `showOnLoad` | boolean | `true` | Show widget automatically |
| `language` | string | `'en'` | Widget language (`'en'`, `'de'`) |

## API Methods

The widget provides various methods for control:

```javascript
// Show widget
widget.show();

// Hide widget
widget.hide();

// Completely remove widget
widget.destroy();

// Global function for easy initialization
window.initAccessibilityWidget({
    position: 'bottom-right',
    buttonColor: '#007bff'
});
```

## Example Configurations

### Minimal Configuration
```javascript
const widget = new AccessibilityWidget({
    position: 'bottom-left',
    buttonColor: '#28a745',
    showOnLoad: false
});
```

### Large Widget for Touch Devices
```javascript
const widget = new AccessibilityWidget({
    buttonSize: 60,
    panelWidth: 350,
    buttonColor: '#ff6b35',
    buttonHoverColor: '#e55a2b'
});
```

### Top Right Positioned
```javascript
const widget = new AccessibilityWidget({
    position: 'top-right',
    buttonColor: '#6f42c1',
    buttonHoverColor: '#5a32a3'
});
```

## Accessibility Features

### Text-to-Speech
- **Mac Support**: Prefers 'Anna' voice on Mac systems
- **German Voices**: Automatically searches for German voices
- **Fallback**: Uses default voice if no German voice is available

### Responsive Design
- Automatic adaptation to different screen sizes
- Touch-optimized for mobile devices
- Support for `prefers-reduced-motion` media query

### Dark Mode Support
- Automatic adaptation to system dark mode
- Support for `prefers-color-scheme: dark`

### Keyboard Navigation
- Full keyboard navigation
- Focus management
- ESC key to close panel

## Browser Compatibility

- Chrome 66+
- Firefox 60+
- Safari 12+
- Edge 79+

## Dependencies

- **Font Awesome 6.5.2**: For icons (locally embedded)
- **Poppins Font**: For typography (locally embedded)
- **No internet connection required**: All files are locally available

## License

This project is licensed under the MIT License.

## Changelog

### Version 1.0
- Initial release
- All basic accessibility features
- Full configurability
- Responsive design
- Dark mode support

## Contributing

Improvement suggestions and bug reports are welcome! Please create an issue or pull request.

## Support

For questions or problems, please create an issue in the repository. 