
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Save, Eye, Globe } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import TemplateSelector from '@/components/landing/TemplateSelector';
import ContentEditor from '@/components/landing/ContentEditor';
import TemplateRenderer from '@/components/landing/TemplateRenderer';
import { LandingTemplate, LandingPageData } from '@/types/landing-templates';

const LandingBuilder = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<'template' | 'editor' | 'preview'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<LandingTemplate | null>(null);
  const [landingData, setLandingData] = useState<LandingPageData>({
    templateId: '',
    colorSchemeId: '',
    content: {},
    customizations: {
      font: 'inter',
      animations: true,
      seo: {
        title: '',
        description: '',
        keywords: []
      }
    }
  });

  const handleSelectTemplate = (template: LandingTemplate) => {
    setSelectedTemplate(template);
    setLandingData({
      ...landingData,
      templateId: template.id,
      colorSchemeId: template.colorSchemes[0].id
    });
    setCurrentStep('editor');
  };

  const handlePreviewTemplate = (template: LandingTemplate) => {
    // Create a preview with sample data
    const previewData: LandingPageData = {
      templateId: template.id,
      colorSchemeId: template.colorSchemes[0].id,
      content: {
        hero: {
          headline: 'Transform Your Business Today',
          subheadline: 'Discover the solution that will revolutionize the way you work and help you achieve incredible results.',
          ctaText: 'Get Started Now',
          ctaLink: '#'
        },
        features: {
          title: 'Why Choose Us?',
          features: '🚀 Fast & Reliable\nGet results quickly with our optimized solutions\n\n🎯 Targeted Results\nPrecision-focused approach that delivers exactly what you need\n\n💎 Premium Quality\nTop-tier quality standards ensuring the best value'
        }
      },
      customizations: {
        font: 'inter',
        animations: true,
        seo: {
          title: template.name + ' Preview',
          description: template.description,
          keywords: []
        }
      }
    };

    const previewWindow = window.open('', '_blank', 'width=1200,height=800');
    if (previewWindow) {
      previewWindow.document.write(`
        <div id="preview-container" style="width: 100%; height: 100vh;">
          <iframe style="width: 100%; height: 100%; border: none;" srcdoc="${encodeURIComponent(generateHTML(template, previewData))}"></iframe>
        </div>
      `);
    }
  };

  const generateHTML = (template: LandingTemplate, data: LandingPageData) => {
    // This would use the same logic as TemplateRenderer but return the HTML string
    return `<!DOCTYPE html><html><head><title>Preview</title></head><body><h1>Preview of ${template.name}</h1></body></html>`;
  };

  const handleSave = async () => {
    if (!user || !selectedTemplate) {
      toast.error('Please log in and select a template first');
      return;
    }

    try {
      const { error } = await supabase
        .from('landing_pages')
        .insert({
          user_id: user.id,
          page_title: landingData.customizations.seo.title || selectedTemplate.name,
          page_html: '', // Would be generated from TemplateRenderer
          template_id: selectedTemplate.id,
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
    if (!selectedTemplate) return;
    
    // Generate HTML content using TemplateRenderer logic
    const htmlContent = generateHTML(selectedTemplate, landingData);
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${landingData.customizations.seo.title || selectedTemplate.name}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {currentStep !== 'template' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep(currentStep === 'preview' ? 'editor' : 'template')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Landing Page Builder</h1>
            <p className="text-lg text-gray-600">Create professional landing pages with ease</p>
          </div>
        </div>

        {/* Action Buttons */}
        {currentStep === 'editor' && (
          <div className="flex gap-2">
            <Button 
              onClick={() => setCurrentStep('preview')} 
              variant="outline"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave} variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        )}

        {currentStep === 'preview' && (
          <div className="flex gap-2">
            <Button onClick={handleSave} variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      {currentStep === 'template' && (
        <TemplateSelector
          selectedTemplate={selectedTemplate?.id || null}
          onSelectTemplate={handleSelectTemplate}
          onPreviewTemplate={handlePreviewTemplate}
        />
      )}

      {currentStep === 'editor' && selectedTemplate && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {selectedTemplate.name}
                </CardTitle>
                <CardDescription>
                  {selectedTemplate.description}
                </CardDescription>
              </CardHeader>
            </Card>
            
            <ContentEditor
              template={selectedTemplate}
              data={landingData}
              onDataChange={setLandingData}
            />
          </div>

          <div className="lg:sticky lg:top-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  See your changes in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 border rounded-lg overflow-hidden">
                  <TemplateRenderer
                    template={selectedTemplate}
                    data={landingData}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {currentStep === 'preview' && selectedTemplate && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Full Preview</CardTitle>
              <CardDescription>
                See how your landing page will look to visitors
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-screen border rounded-lg overflow-hidden">
                <TemplateRenderer
                  template={selectedTemplate}
                  data={landingData}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LandingBuilder;
