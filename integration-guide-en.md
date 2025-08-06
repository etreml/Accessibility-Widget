# Integration Guide - Accessibility Widget

> **German version available:** [integration-guide.md](integration-guide.md)

## Quick Integration into Your Website

### 1. Include Files

Add this line to the `<head>` of your HTML file:

```html
<!-- Accessibility Widget CSS (includes local Poppins font and Font Awesome) -->
<link rel="stylesheet" href="accessibility-widget/accessibility-widget.css">
```

### 2. Include JavaScript

Add these lines before the closing `</body>` tag:

```html
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
```

### 3. Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
    
    <!-- Accessibility Widget CSS (includes local Poppins font and Font Awesome) -->
    <link rel="stylesheet" href="accessibility-widget/accessibility-widget.css">
</head>
<body>
    <!-- Your page content here -->
    
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

## Configuration Options

```javascript
const widget = new AccessibilityWidget({
    // Position: 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'
    position: 'bottom-right',
    
    // Colors
    buttonColor: '#007bff',
    buttonHoverColor: '#0056b3',
    
    // Sizes
    panelWidth: 300,
    buttonSize: 50,
    
    // Margins
    margin: 20,
    
    // Language
    language: 'en', // 'en' or 'de'
    
    // Show automatically
    showOnLoad: true
});
```

## Available Features

- ✅ High Contrast
- ✅ Invert Colors
- ✅ Highlight Links
- ✅ Reading Guide
- ✅ Change Text Size
- ✅ Reduce Motion
- ✅ Read Page Aloud
- ✅ Read Element Aloud
- ✅ Automatic Settings Storage

## Browser Support

- Chrome 66+
- Firefox 60+
- Safari 12+
- Edge 79+

## Notes

- The widget is completely self-contained and requires no additional dependencies
- All fonts (Poppins and Font Awesome) are locally embedded
- No internet connection required - works offline
- All settings are automatically saved
- The widget is responsive and works on all devices 