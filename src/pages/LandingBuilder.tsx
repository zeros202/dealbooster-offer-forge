
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Globe, Eye, Save, Download } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const LandingBuilder = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    pageTitle: '',
    headline: '',
    subheadline: '',
    ctaText: '',
    ctaLink: '',
    backgroundColor: '#ffffff',
    textColor: '#000000'
  });
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateLandingPage = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.pageTitle}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Arial', sans-serif;
            background-color: ${formData.backgroundColor};
            color: ${formData.textColor};
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: linear-gradient(135deg, ${formData.backgroundColor} 0%, #f8f9fa 100%);
        }
        .hero-content {
            max-width: 800px;
        }
        .headline {
            font-size: 3.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .subheadline {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.8;
        }
        .cta-button {
            display: inline-block;
            padding: 15px 40px;
            background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 1.2rem;
            transition: transform 0.3s ease;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }
        .features {
            padding: 80px 0;
            background: rgba(255, 255, 255, 0.1);
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        .feature-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .feature-icon {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        @media (max-width: 768px) {
            .headline {
                font-size: 2.5rem;
            }
            .subheadline {
                font-size: 1.2rem;
            }
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1 class="headline">${formData.headline}</h1>
                <p class="subheadline">${formData.subheadline}</p>
                <a href="${formData.ctaLink}" class="cta-button">${formData.ctaText}</a>
            </div>
        </div>
    </section>
    
    <section class="features">
        <div class="container">
            <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 20px;">Why Choose Us?</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <h3>Fast & Reliable</h3>
                    <p>Get results quickly with our optimized solutions designed for maximum efficiency.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎯</div>
                    <h3>Targeted Results</h3>
                    <p>Precision-focused approach that delivers exactly what you need, when you need it.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">💎</div>
                    <h3>Premium Quality</h3>
                    <p>Top-tier quality standards ensuring you get the best value for your investment.</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`;
      
      setGeneratedHtml(html);
      setIsGenerating(false);
      toast.success('Landing page generated successfully!');
    }, 1500);
  };

  const handleSave = async () => {
    if (!user || !generatedHtml) {
      toast.error('Please log in and generate a landing page first');
      return;
    }

    try {
      const { error } = await supabase
        .from('landing_pages')
        .insert({
          user_id: user.id,
          page_title: formData.pageTitle,
          page_html: generatedHtml,
          is_published: false
        });

      if (error) throw error;
      
      toast.success('Landing page saved successfully!');
    } catch (error) {
      console.error('Error saving landing page:', error);
      toast.error('Failed to save landing page');
    }
  };

  const handleDownload = () => {
    if (!generatedHtml) return;
    
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.pageTitle || 'landing-page'}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Landing Page Builder</h1>
        <p className="text-lg text-gray-600">Create beautiful landing pages in minutes</p>
      </div>

      {!isPreviewMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Page Settings
              </CardTitle>
              <CardDescription>
                Configure your landing page content and styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="page-title">Page Title *</Label>
                <Input
                  id="page-title"
                  value={formData.pageTitle}
                  onChange={(e) => handleInputChange('pageTitle', e.target.value)}
                  placeholder="Amazing Product Landing Page"
                />
              </div>

              <div>
                <Label htmlFor="headline">Main Headline *</Label>
                <Input
                  id="headline"
                  value={formData.headline}
                  onChange={(e) => handleInputChange('headline', e.target.value)}
                  placeholder="Transform Your Business Today"
                />
              </div>

              <div>
                <Label htmlFor="subheadline">Subheadline *</Label>
                <Textarea
                  id="subheadline"
                  value={formData.subheadline}
                  onChange={(e) => handleInputChange('subheadline', e.target.value)}
                  placeholder="Discover the solution that will revolutionize the way you work and help you achieve incredible results."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="cta-text">Call-to-Action Text *</Label>
                <Input
                  id="cta-text"
                  value={formData.ctaText}
                  onChange={(e) => handleInputChange('ctaText', e.target.value)}
                  placeholder="Get Started Now"
                />
              </div>

              <div>
                <Label htmlFor="cta-link">Call-to-Action Link</Label>
                <Input
                  id="cta-link"
                  value={formData.ctaLink}
                  onChange={(e) => handleInputChange('ctaLink', e.target.value)}
                  placeholder="https://example.com/signup"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bg-color">Background Color</Label>
                  <Input
                    id="bg-color"
                    type="color"
                    value={formData.backgroundColor}
                    onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="text-color">Text Color</Label>
                  <Input
                    id="text-color"
                    type="color"
                    value={formData.textColor}
                    onChange={(e) => handleInputChange('textColor', e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={generateLandingPage}
                disabled={!formData.pageTitle || !formData.headline || isGenerating}
                className="w-full"
              >
                <Globe className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Landing Page'}
              </Button>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                See how your landing page will look
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedHtml ? (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                    <iframe
                      srcDoc={generatedHtml}
                      className="w-full h-64 border rounded"
                      title="Landing Page Preview"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setIsPreviewMode(true)} className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Full Preview
                    </Button>
                    <Button onClick={handleSave} variant="outline" className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleDownload} variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  <div className="text-center">
                    <Globe className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Fill in the form and generate your landing page to see the preview</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Full Preview</h2>
            <Button onClick={() => setIsPreviewMode(false)} variant="outline">
              Back to Editor
            </Button>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <iframe
              srcDoc={generatedHtml}
              className="w-full h-screen"
              title="Landing Page Full Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingBuilder;
