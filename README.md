# Accessibility Widget

Ein konfigurierbares Barrierefreiheits-Tool für Webseiten, das verschiedene Hilfsfunktionen für Menschen mit Behinderungen bereitstellt.

Es werden keine rechtlichen Haftungen übernommen. Dieses Widget wurde vollkommen mit KI generiert.

> **English version available:** [README-en.md](README-en.md)

## Features

- **Hoher Kontrast**: Ändert die Farben für bessere Lesbarkeit
- **Farben umkehren**: Invertiert alle Farben auf der Seite
- **Links hervorheben**: Zeigt alle klickbaren Elemente deutlich an
- **Lesehilfe**: Fügt horizontale Linien zur besseren Orientierung hinzu
- **Textgröße**: Vergrößert oder verkleinert den Text
- **Bewegung reduzieren**: Deaktiviert Animationen für empfindliche Nutzer
- **Seite vorlesen**: Liest den gesamten Seiteninhalt vor
- **Element vorlesen**: Liest einzelne Elemente beim Klicken vor
- **Automatische Einstellungsspeicherung**: Speichert Benutzereinstellungen im localStorage

## Installation

1. Laden Sie den gesamten `accessibility-widget` Ordner herunter
2. Fügen Sie die CSS-Datei in den `<head>` Ihrer HTML-Datei ein
3. Fügen Sie die JS-Datei vor dem schließenden `</body>` Tag ein
4. Initialisieren Sie das Widget mit Ihrer gewünschten Konfiguration

### Ordnerstruktur
```
accessibility-widget/
├── accessibility-widget.js          # Haupt-JavaScript-Datei
├── accessibility-widget.css         # Haupt-CSS-Datei (inkl. lokaler Schriftarten)
├── accessibility-widget-example.html # Beispiel-Implementierung
├── README-accessibility-widget.md   # Dokumentation
├── integration-guide.md             # Schnelle Integrationsanleitung
└── fonts/
    ├── poppins.css                  # Lokale Poppins-Schriftart CSS
    ├── poppins-300.woff2           # Poppins Light
    ├── poppins-400.woff2           # Poppins Regular
    ├── poppins-600.woff2           # Poppins SemiBold
    ├── poppins-700.woff2           # Poppins Bold
    ├── fontawesome.css              # Font Awesome CSS (lokal)
    ├── all.min.css                  # Font Awesome CSS (lokal)
    ├── fa-solid-900.woff2          # Font Awesome Solid Icons
    ├── fa-regular-400.woff2        # Font Awesome Regular Icons
    └── fa-brands-400.woff2         # Font Awesome Brand Icons
```

### Beispiel Integration

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meine Webseite</title>
    
    <!-- Accessibility Widget CSS (includes local Poppins font and Font Awesome) -->
    <link rel="stylesheet" href="accessibility-widget.css">
</head>
<body>
    <!-- Ihr Seiteninhalt -->
    
    <!-- Accessibility Widget JS -->
    <script src="accessibility-widget.js"></script>
    
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

## Konfiguration

Das Widget kann vollständig konfiguriert werden:

```javascript
const widget = new AccessibilityWidget({
    // Position des Buttons
    position: 'bottom-right', // 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'
    
    // Farben
    buttonColor: '#007bff',
    buttonHoverColor: '#0056b3',
    
    // Größen
    panelWidth: 300,
    buttonSize: 50,
    
    // Abstände
    margin: 20,
    
    // Z-Index
    zIndex: 9999,
    
    // Automatisch anzeigen beim Laden
    showOnLoad: true,
    
    // Sprache
    language: 'en'
});
```

### Verfügbare Konfigurationsoptionen

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `position` | string | `'bottom-right'` | Position des Widget-Buttons (top-left, top-center, top-right, middle-left, middle-right, bottom-left, bottom-center, bottom-right) |
| `buttonColor` | string | `'#007bff'` | Farbe des Buttons |
| `buttonHoverColor` | string | `'#0056b3'` | Farbe beim Hover |
| `panelWidth` | number | `300` | Breite des Panels in Pixeln |
| `buttonSize` | number | `50` | Größe des Buttons in Pixeln |
| `margin` | number | `20` | Abstand vom Rand in Pixeln |
| `zIndex` | number | `9999` | Z-Index des Widgets |
| `showOnLoad` | boolean | `true` | Widget automatisch anzeigen |
| `language` | string | `'en'` | Sprache des Widgets (`'en'`, `'de'`) |

## API-Methoden

Das Widget bietet verschiedene Methoden zur Steuerung:

```javascript
// Widget anzeigen
widget.show();

// Widget verstecken
widget.hide();

// Widget komplett entfernen
widget.destroy();

// Globale Funktion für einfache Initialisierung
window.initAccessibilityWidget({
    position: 'bottom-right',
    buttonColor: '#007bff'
});
```

## Beispiel-Konfigurationen

### Minimalistische Konfiguration
```javascript
const widget = new AccessibilityWidget({
    position: 'bottom-left',
    buttonColor: '#28a745',
    showOnLoad: false
});
```

### Großes Widget für Touch-Geräte
```javascript
const widget = new AccessibilityWidget({
    buttonSize: 60,
    panelWidth: 350,
    buttonColor: '#ff6b35',
    buttonHoverColor: '#e55a2b'
});
```

### Oben rechts positioniert
```javascript
const widget = new AccessibilityWidget({
    position: 'top-right',
    buttonColor: '#6f42c1',
    buttonHoverColor: '#5a32a3'
});
```

## Barrierefreiheits-Features

### Text-to-Speech
- **Mac-Unterstützung**: Bevorzugt die 'Anna'-Stimme auf Mac-Systemen
- **Deutsche Stimmen**: Sucht automatisch nach deutschen Stimmen
- **Fallback**: Verwendet Standard-Stimme, falls keine deutsche Stimme verfügbar ist

### Responsive Design
- Automatische Anpassung an verschiedene Bildschirmgrößen
- Touch-optimiert für mobile Geräte
- Unterstützung für `prefers-reduced-motion` Media Query

### Dark Mode Support
- Automatische Anpassung an System-Dark-Mode
- Unterstützung für `prefers-color-scheme: dark`

### Keyboard Navigation
- Vollständige Tastaturnavigation
- Focus-Management
- ESC-Taste zum Schließen des Panels

## Browser-Kompatibilität

- Chrome 66+
- Firefox 60+
- Safari 12+
- Edge 79+

## Abhängigkeiten

- **Font Awesome 6.5.2**: Für Icons (lokal eingebunden)
- **Poppins Font**: Für die Schriftart (lokal eingebunden)
- **Keine Internetverbindung erforderlich**: Alle Dateien sind lokal verfügbar

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz.

## Changelog

### Version 1.0
- Erste Veröffentlichung
- Alle grundlegenden Barrierefreiheits-Features
- Vollständige Konfigurierbarkeit
- Responsive Design
- Dark Mode Support

## Beitragen

Verbesserungsvorschläge und Bug-Reports sind willkommen! Bitte erstellen Sie ein Issue oder einen Pull Request.

## Support

Bei Fragen oder Problemen erstellen Sie bitte ein Issue im Repository. 