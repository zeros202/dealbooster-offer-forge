
import React, { useRef, useEffect, useState } from 'react';
import { Canvas as FabricCanvas, FabricText, FabricImage } from 'fabric';
import { ImageUpload } from './ImageUpload';
import { TextControls } from './TextControls';
import { CanvasToolbar } from './CanvasToolbar';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export const DealBoosterCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [selectedText, setSelectedText] = useState<FabricText | null>(null);
  const [hasBackground, setHasBackground] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    // Handle text selection
    canvas.on('selection:created', (e) => {
      if (e.selected && e.selected[0] instanceof FabricText) {
        setSelectedText(e.selected[0] as FabricText);
      }
    });

    canvas.on('selection:updated', (e) => {
      if (e.selected && e.selected[0] instanceof FabricText) {
        setSelectedText(e.selected[0] as FabricText);
      }
    });

    canvas.on('selection:cleared', () => {
      setSelectedText(null);
    });

    setFabricCanvas(canvas);
    toast.success("Canvas ready! Upload an image or add text to get started.");

    return () => {
      canvas.dispose();
    };
  }, []);

  const handleImageUpload = (file: File) => {
    if (!fabricCanvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgElement = new Image();
      imgElement.onload = () => {
        const fabricImg = new FabricImage(imgElement, {
          left: 0,
          top: 0,
          scaleX: fabricCanvas.width! / imgElement.width,
          scaleY: fabricCanvas.height! / imgElement.height,
          selectable: false,
        });

        fabricCanvas.clear();
        fabricCanvas.add(fabricImg);
        fabricImg.sendToBack();
        fabricCanvas.renderAll();
        setHasBackground(true);
        toast.success("Image uploaded successfully!");
      };
      imgElement.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const addText = () => {
    if (!fabricCanvas) return;

    const text = new FabricText('Your Text Here', {
      left: fabricCanvas.width! / 2 - 100,
      top: fabricCanvas.height! / 2 - 20,
      fontSize: 40,
      fontFamily: 'Arial',
      fill: '#000000',
      fontWeight: 'bold',
    });

    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    fabricCanvas.renderAll();
    setSelectedText(text);
    toast.success("Text added to canvas!");
  };

  const exportCanvas = () => {
    if (!fabricCanvas) return;

    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1,
    });

    const link = document.createElement('a');
    link.download = 'dealbooster-design.png';
    link.href = dataURL;
    link.click();

    toast.success("Image exported successfully!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Canvas Area */}
      <div className="lg:col-span-3">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Design Canvas</h3>
            <CanvasToolbar onAddText={addText} onExport={exportCanvas} />
          </div>
          
          {!hasBackground && (
            <div className="mb-4">
              <ImageUpload onImageUpload={handleImageUpload} />
            </div>
          )}

          <div className="flex justify-center">
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
              <canvas ref={canvasRef} className="max-w-full" />
            </div>
          </div>

          {hasBackground && (
            <div className="mt-4 text-center">
              <ImageUpload onImageUpload={handleImageUpload} variant="compact" />
            </div>
          )}
        </Card>
      </div>

      {/* Controls Panel */}
      <div className="lg:col-span-1">
        <TextControls 
          selectedText={selectedText}
          fabricCanvas={fabricCanvas}
        />
      </div>
    </div>
  );
};
