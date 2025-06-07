
import React from 'react';
import { FabricText, Canvas as FabricCanvas } from 'fabric';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Palette, Type, Bold, Italic } from 'lucide-react';

interface TextControlsProps {
  selectedText: FabricText | null;
  fabricCanvas: FabricCanvas | null;
}

export const TextControls: React.FC<TextControlsProps> = ({ 
  selectedText, 
  fabricCanvas 
}) => {
  const updateTextProperty = (property: string, value: any) => {
    if (!selectedText || !fabricCanvas) return;

    selectedText.set(property, value);
    fabricCanvas.renderAll();
  };

  const changeTextContent = (value: string) => {
    if (!selectedText || !fabricCanvas) return;

    selectedText.set('text', value);
    fabricCanvas.renderAll();
  };

  const toggleBold = () => {
    if (!selectedText) return;
    const currentWeight = selectedText.fontWeight;
    updateTextProperty('fontWeight', currentWeight === 'bold' ? 'normal' : 'bold');
  };

  const toggleItalic = () => {
    if (!selectedText) return;
    const currentStyle = selectedText.fontStyle;
    updateTextProperty('fontStyle', currentStyle === 'italic' ? 'normal' : 'italic');
  };

  const addTextShadow = () => {
    if (!selectedText || !fabricCanvas) return;

    selectedText.set('shadow', {
      color: 'rgba(0,0,0,0.3)',
      blur: 5,
      offsetX: 3,
      offsetY: 3,
    });
    fabricCanvas.renderAll();
  };

  const removeTextShadow = () => {
    if (!selectedText || !fabricCanvas) return;

    selectedText.set('shadow', null);
    fabricCanvas.renderAll();
  };

  if (!selectedText) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          <Type className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="font-medium mb-2">No Text Selected</h3>
          <p className="text-sm">Select a text element to edit its properties</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Type className="h-5 w-5 mr-2" />
          Text Properties
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="text-content">Text Content</Label>
            <Input
              id="text-content"
              value={selectedText.text || ''}
              onChange={(e) => changeTextContent(e.target.value)}
              placeholder="Enter your text..."
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={selectedText.fontWeight === 'bold' ? 'default' : 'outline'}
              size="sm"
              onClick={toggleBold}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant={selectedText.fontStyle === 'italic' ? 'default' : 'outline'}
              size="sm"
              onClick={toggleItalic}
            >
              <Italic className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label htmlFor="font-family">Font Family</Label>
            <Select
              value={selectedText.fontFamily || 'Arial'}
              onValueChange={(value) => updateTextProperty('fontFamily', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Helvetica">Helvetica</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
                <SelectItem value="Verdana">Verdana</SelectItem>
                <SelectItem value="Impact">Impact</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="font-size">Font Size: {selectedText.fontSize}px</Label>
            <Slider
              value={[selectedText.fontSize || 40]}
              onValueChange={(value) => updateTextProperty('fontSize', value[0])}
              max={200}
              min={10}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="text-color">Text Color</Label>
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="color"
                value={selectedText.fill as string || '#000000'}
                onChange={(e) => updateTextProperty('fill', e.target.value)}
                className="w-8 h-8 rounded border border-gray-300"
              />
              <Input
                value={selectedText.fill as string || '#000000'}
                onChange={(e) => updateTextProperty('fill', e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Palette className="h-5 w-5 mr-2" />
          Text Effects
        </h3>
        
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={addTextShadow}
            className="w-full"
          >
            Add Shadow
          </Button>
          <Button
            variant="outline"
            onClick={removeTextShadow}
            className="w-full"
          >
            Remove Shadow
          </Button>
        </div>
      </Card>
    </div>
  );
};
