
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Download, Save, Type, Image as ImageIcon, Palette } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const DealBoosterCanvas = () => {
  const { user } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [overlayText, setOverlayText] = useState('Special Offer!');
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState('#ffffff');
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedImage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = 800;
      canvas.height = 600;
      
      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Draw text overlay
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = textColor;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.textAlign = 'center';
      
      const x = (textPosition.x / 100) * canvas.width;
      const y = (textPosition.y / 100) * canvas.height;
      
      ctx.strokeText(overlayText, x, y);
      ctx.fillText(overlayText, x, y);
    };
    img.src = selectedImage;
  };

  useEffect(() => {
    drawCanvas();
  }, [selectedImage, overlayText, fontSize, textColor, textPosition]);

  const handleSave = async () => {
    if (!user || !canvasRef.current) {
      toast.error('Please log in and create an image first');
      return;
    }

    setIsLoading(true);
    try {
      const canvas = canvasRef.current;
      const imageData = canvas.toDataURL();
      
      const { error } = await supabase
        .from('deal_images')
        .insert({
          user_id: user.id,
          title: 'Deal Image',
          image_data: imageData,
          overlay_text: overlayText,
          template_settings: {
            fontSize,
            textColor,
            textPosition
          }
        });

      if (error) throw error;
      
      toast.success('Image saved successfully!');
    } catch (error) {
      console.error('Error saving image:', error);
      toast.error('Failed to save image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'deal-image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Canvas */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Canvas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
              {selectedImage ? (
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-[400px] border rounded"
                />
              ) : (
                <div className="text-center">
                  <ImageIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Upload an image to get started</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Click to upload image</span>
                </div>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Text Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Text Overlay
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="overlay-text">Text</Label>
              <Textarea
                id="overlay-text"
                value={overlayText}
                onChange={(e) => setOverlayText(e.target.value)}
                placeholder="Enter your text..."
              />
            </div>
            
            <div>
              <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
              <Input
                id="font-size"
                type="range"
                min="20"
                max="100"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="text-color">Text Color</Label>
              <Input
                id="text-color"
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </div>

            <div>
              <Label>Position X: {textPosition.x}%</Label>
              <Input
                type="range"
                min="0"
                max="100"
                value={textPosition.x}
                onChange={(e) => setTextPosition(prev => ({ ...prev, x: Number(e.target.value) }))}
              />
            </div>

            <div>
              <Label>Position Y: {textPosition.y}%</Label>
              <Input
                type="range"
                min="0"
                max="100"
                value={textPosition.y}
                onChange={(e) => setTextPosition(prev => ({ ...prev, y: Number(e.target.value) }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <Button 
                onClick={handleSave} 
                disabled={!selectedImage || isLoading}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Image'}
              </Button>
              
              <Button 
                onClick={handleDownload} 
                disabled={!selectedImage}
                variant="outline"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
