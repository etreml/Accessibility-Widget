# Integration Guide - Accessibility Widget

> **English version available:** [integration-guide-en.md](integration-guide-en.md)

## Schnelle Integration in Ihre Webseite

### 1. Dateien einbinden

Fügen Sie diese Zeile in den `<head>` Ihrer HTML-Datei ein:

```html
<!-- Accessibility Widget CSS (inkl. lokaler Poppins-Schriftart und Font Awesome) -->
<link rel="stylesheet" href="accessibility-widget/accessibility-widget.css">
```

### 2. JavaScript einbinden

Fügen Sie diese Zeilen vor dem schließenden `</body>` Tag ein:

```html
<!-- Accessibility Widget JS -->
<script src="accessibility-widget/accessibility-widget.js"></script>

<!-- Widget initialisieren -->
<script>
    const accessibilityWidget = new AccessibilityWidget({
        position: 'bottom-right',
        buttonColor: '#007bff',
        showOnLoad: true
    });
</script>
```

### 3. Vollständiges Beispiel

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ihre Webseite</title>
    
    <!-- Accessibility Widget CSS (inkl. lokaler Poppins-Schriftart und Font Awesome) -->
    <link rel="stylesheet" href="accessibility-widget/accessibility-widget.css">
</head>
<body>
    <!-- Ihr Seiteninhalt hier -->
    
    <!-- Accessibility Widget JS -->
    <script src="accessibility-widget/accessibility-widget.js"></script>
    
    <!-- Widget initialisieren -->
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

## Konfigurationsoptionen

```javascript
const widget = new AccessibilityWidget({
    // Position: 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'
    position: 'bottom-right',
    
    // Farben
    buttonColor: '#007bff',
    buttonHoverColor: '#0056b3',
    
    // Größen
    panelWidth: 300,
    buttonSize: 50,
    
    // Abstände
    margin: 20,
    
    // Sprache
    language: 'en', // 'en' oder 'de'
    
    // Automatisch anzeigen
    showOnLoad: true
});
```

## Verfügbare Features

- ✅ Hoher Kontrast
- ✅ Farben umkehren
- ✅ Links hervorheben
- ✅ Lesehilfe
- ✅ Textgröße ändern
- ✅ Bewegung reduzieren
- ✅ Seite vorlesen
- ✅ Element vorlesen
- ✅ Automatische Einstellungsspeicherung

## Browser-Support

- Chrome 66+
- Firefox 60+
- Safari 12+
- Edge 79+

## Hinweise

- Das Widget ist vollständig eigenständig und benötigt keine weiteren Abhängigkeiten
- Alle Schriftarten (Poppins und Font Awesome) sind lokal eingebunden
- Keine Internetverbindung erforderlich - funktioniert offline
- Alle Einstellungen werden automatisch gespeichert
- Das Widget ist responsive und funktioniert auf allen Geräten 