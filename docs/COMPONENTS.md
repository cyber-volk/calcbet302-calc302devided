# Calculator Components Documentation

## Overview
The calculator application is built with a modular architecture, focusing on maintainability, reusability, and clear separation of concerns. Each component has a specific responsibility and is designed to work independently while maintaining seamless integration with the overall system.

## Core Components

### 1. Calculator (`Calculator.tsx`)
The main container component that orchestrates the calculator's functionality.

**Features:**
- Manages overall calculator state
- Coordinates between sub-components
- Handles form submission and calculations

### 2. CalculatorForm (`CalculatorForm.tsx`)
Handles the input form and user interactions.

**Features:**
- Form field management
- Input validation
- Real-time calculations
- Voice input integration

### 3. CalculatorProcessor (`CalculatorProcessor.tsx`)
Manages calculation logic and result processing.

**Features:**
- Performs mathematical operations
- Handles currency formatting
- Provides calculation history
- Error handling for calculations

### 4. Row Components (`RowComponents.tsx`)
Manages different types of calculation rows.

**Types:**
- CreditRow
- CreditPayeeRow
- DepenseRow
- RetraitRow

**Features:**
- Individual row calculations
- Row-specific validation
- Voice input per row
- Dynamic row addition/removal

## Feature-Specific Components

### 1. Site Components (`/site`)
Manages site-related functionality.

**Features:**
- Site creation and management
- Color theming
- Site-specific calculations
- Site statistics

### 2. Voice Components (`/voice`)
Handles voice input functionality.

**Features:**
- Multi-language support (ar-SA, fr-FR, en-US)
- Voice recognition
- Real-time feedback
- Error handling for voice input

### 3. Export Components (`/export`)
Manages export functionality.

**Features:**
- PDF export
- Image export
- Customizable export options
- Error handling for export operations

### 4. Preview Components (`/preview`)
Handles preview functionality.

**Features:**
- Real-time preview
- Print layout
- Mobile responsiveness

## Styling System

The application uses a consistent styling system defined in `styles.ts`:

- Common button styles
- Input field styles
- Container styles
- Form group styles
- Animation classes
- Voice input specific styles
- Site color specific styles

## Error Handling

Comprehensive error handling system in `errorHandling.ts`:

- Multi-language error messages
- Form validation
- Number validation
- Error boundary component
- Custom validation hooks

## Best Practices

1. **Component Organization:**
   - Keep components focused and single-responsibility
   - Use proper file structure
   - Maintain clear component hierarchy

2. **State Management:**
   - Use appropriate React hooks
   - Implement proper state lifting
   - Handle side effects correctly

3. **Error Handling:**
   - Implement proper error boundaries
   - Use consistent error messages
   - Handle edge cases

4. **Styling:**
   - Use consistent class naming
   - Follow Tailwind CSS conventions
   - Maintain responsive design

5. **Performance:**
   - Implement proper memoization
   - Handle large datasets efficiently
   - Optimize re-renders

## Usage Examples

### Basic Calculator Usage
```tsx
<Calculator>
  <CalculatorForm />
  <CalculatorProcessor />
</Calculator>
```

### Adding Voice Input
```tsx
<VoiceInputButton
  onVoiceInput={handleVoiceInput}
  showButton={true}
  voiceLanguage="en-US"
/>
```

### Implementing Site Colors
```tsx
<SiteCard
  site={site}
  isDefault={false}
  onSelect={handleSiteSelect}
  onUpdateSite={handleSiteUpdate}
  onDeleteSite={handleSiteDelete}
/>
```

## Contributing

When adding new features or modifying existing ones:

1. Follow the established component structure
2. Maintain consistent styling
3. Add proper error handling
4. Update documentation
5. Add necessary tests

## Testing

Each component should have associated tests covering:

- Component rendering
- User interactions
- Error states
- Edge cases
- Integration with other components
