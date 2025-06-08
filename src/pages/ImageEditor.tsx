
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image as ImageIcon, Palette, Type, Save, Download } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ImageEditor = () => {
  const { user } = useAuth();
  const [savedImages, setSavedImages] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadSavedImages();
    }
  }, [user]);

  const loadSavedImages = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('deal_images')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedImages(data || []);
    } catch (error) {
      console.error('Error loading images:', error);
      toast.error('Failed to load saved images');
    }
  };

  const handleImageSelect = (image: any) => {
    setSelectedImage(image);
  };

  const handleDownloadImage = (image: any) => {
    if (!image.image_data) return;
    
    const link = document.createElement('a');
    link.href = image.image_data;
    link.download = `${image.title || 'image'}.png`;
    link.click();
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('deal_images')
        .delete()
        .eq('id', imageId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast.success('Image deleted successfully');
      loadSavedImages();
      if (selectedImage?.id === imageId) {
        setSelectedImage(null);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Editor</h1>
        <p className="text-lg text-gray-600">Manage and edit your deal images</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Saved Images */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Saved Images
              </CardTitle>
              <CardDescription>
                Your previously created deal images
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedImages.length > 0 ? (
                <div className="space-y-3">
                  {savedImages.map((image) => (
                    <div
                      key={image.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedImage?.id === image.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleImageSelect(image)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{image.title || 'Untitled'}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(image.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadImage(image);
                            }}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteImage(image.id);
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                      {image.overlay_text && (
                        <p className="text-xs text-gray-600 mt-1 truncate">"{image.overlay_text}"</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No saved images yet</p>
                  <p className="text-xs">Create some in the DealBooster tool</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Image Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Image Preview</CardTitle>
              <CardDescription>
                View and manage your selected image
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedImage ? (
                <div className="space-y-4">
                  {selectedImage.image_data && (
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <img
                        src={selectedImage.image_data}
                        alt={selectedImage.title || 'Deal image'}
                        className="max-w-full max-h-96 mx-auto rounded"
                      />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input value={selectedImage.title || 'Untitled'} readOnly />
                    </div>
                    <div>
                      <Label>Created</Label>
                      <Input 
                        value={new Date(selectedImage.created_at).toLocaleString()} 
                        readOnly 
                      />
                    </div>
                  </div>

                  {selectedImage.overlay_text && (
                    <div>
                      <Label>Overlay Text</Label>
                      <Input value={selectedImage.overlay_text} readOnly />
                    </div>
                  )}

                  {selectedImage.template_settings && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Font Size</Label>
                        <Input 
                          value={`${selectedImage.template_settings.fontSize || 'N/A'}px`} 
                          readOnly 
                        />
                      </div>
                      <div>
                        <Label>Text Color</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            value={selectedImage.template_settings.textColor || 'N/A'} 
                            readOnly 
                          />
                          {selectedImage.template_settings.textColor && (
                            <div 
                              className="w-8 h-8 rounded border"
                              style={{ backgroundColor: selectedImage.template_settings.textColor }}
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <Label>Position</Label>
                        <Input 
                          value={selectedImage.template_settings.textPosition ? 
                            `${selectedImage.template_settings.textPosition.x}%, ${selectedImage.template_settings.textPosition.y}%` : 
                            'N/A'
                          } 
                          readOnly 
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button onClick={() => handleDownloadImage(selectedImage)} className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button 
                      onClick={() => handleDeleteImage(selectedImage.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  <div className="text-center">
                    <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Select an image from the list to view details</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
