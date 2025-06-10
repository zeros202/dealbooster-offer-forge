
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LandingTemplate, LandingPageData, ColorScheme } from '@/types/landing-templates';
import { fontOptions } from '@/data/landing-templates';
import { Palette, Type, Settings, Zap } from 'lucide-react';

interface ContentEditorProps {
  template: LandingTemplate;
  data: LandingPageData;
  onDataChange: (data: LandingPageData) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ template, data, onDataChange }) => {
  const updateContent = (sectionId: string, content: any) => {
    onDataChange({
      ...data,
      content: {
        ...data.content,
        [sectionId]: { ...data.content[sectionId], ...content }
      }
    });
  };

  const updateCustomization = (key: string, value: any) => {
    onDataChange({
      ...data,
      customizations: {
        ...data.customizations,
        [key]: value
      }
    });
  };

  const updateSEO = (key: string, value: any) => {
    onDataChange({
      ...data,
      customizations: {
        ...data.customizations,
        seo: {
          ...data.customizations.seo,
          [key]: value
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          {template.sections.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {section.name}
                  {section.required && <span className="text-red-500">*</span>}
                </CardTitle>
                <CardDescription>
                  Configure the content for your {section.name.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.type === 'hero' && (
                  <>
                    <div>
                      <Label htmlFor={`${section.id}-headline`}>Main Headline</Label>
                      <Input
                        id={`${section.id}-headline`}
                        value={data.content[section.id]?.headline || ''}
                        onChange={(e) => updateContent(section.id, { headline: e.target.value })}
                        placeholder="Your Amazing Product"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${section.id}-subheadline`}>Subheadline</Label>
                      <Textarea
                        id={`${section.id}-subheadline`}
                        value={data.content[section.id]?.subheadline || ''}
                        onChange={(e) => updateContent(section.id, { subheadline: e.target.value })}
                        placeholder="Describe the value proposition..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${section.id}-cta`}>Call-to-Action Text</Label>
                      <Input
                        id={`${section.id}-cta`}
                        value={data.content[section.id]?.ctaText || ''}
                        onChange={(e) => updateContent(section.id, { ctaText: e.target.value })}
                        placeholder="Get Started Today"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${section.id}-cta-link`}>CTA Link</Label>
                      <Input
                        id={`${section.id}-cta-link`}
                        value={data.content[section.id]?.ctaLink || ''}
                        onChange={(e) => updateContent(section.id, { ctaLink: e.target.value })}
                        placeholder="https://example.com/signup"
                      />
                    </div>
                  </>
                )}

                {section.type === 'features' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Section Title</Label>
                      <Input
                        value={data.content[section.id]?.title || ''}
                        onChange={(e) => updateContent(section.id, { title: e.target.value })}
                        placeholder="Why Choose Us?"
                      />
                    </div>
                    <div>
                      <Label>Features (one per line)</Label>
                      <Textarea
                        value={data.content[section.id]?.features || ''}
                        onChange={(e) => updateContent(section.id, { features: e.target.value })}
                        placeholder="🚀 Fast Performance&#10;🎯 Precise Targeting&#10;💎 Premium Quality"
                        rows={6}
                      />
                    </div>
                  </div>
                )}

                {section.type === 'pricing' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Section Title</Label>
                      <Input
                        value={data.content[section.id]?.title || ''}
                        onChange={(e) => updateContent(section.id, { title: e.target.value })}
                        placeholder="Choose Your Plan"
                      />
                    </div>
                    <div>
                      <Label>Pricing Plans (JSON format)</Label>
                      <Textarea
                        value={data.content[section.id]?.plans || ''}
                        onChange={(e) => updateContent(section.id, { plans: e.target.value })}
                        placeholder='[{"name": "Basic", "price": "$29", "features": ["Feature 1", "Feature 2"]}]'
                        rows={8}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="design" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Scheme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {template.colorSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      data.colorSchemeId === scheme.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => onDataChange({ ...data, colorSchemeId: scheme.id })}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: scheme.primary }}
                      />
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: scheme.secondary }}
                      />
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: scheme.accent }}
                      />
                    </div>
                    <p className="font-medium">{scheme.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Font Family</Label>
                <Select
                  value={data.customizations.font}
                  onValueChange={(value) => updateCustomization('font', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.id} value={font.id}>
                        {font.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Page Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Animations</Label>
                  <p className="text-sm text-gray-600">Add smooth transitions and animations</p>
                </div>
                <Switch
                  checked={data.customizations.animations}
                  onCheckedChange={(checked) => updateCustomization('animations', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                SEO Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seo-title">Page Title</Label>
                <Input
                  id="seo-title"
                  value={data.customizations.seo.title}
                  onChange={(e) => updateSEO('title', e.target.value)}
                  placeholder="Amazing Product - Transform Your Business"
                />
              </div>
              <div>
                <Label htmlFor="seo-description">Meta Description</Label>
                <Textarea
                  id="seo-description"
                  value={data.customizations.seo.description}
                  onChange={(e) => updateSEO('description', e.target.value)}
                  placeholder="Discover the solution that will revolutionize your business..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="seo-keywords">Keywords (comma-separated)</Label>
                <Input
                  id="seo-keywords"
                  value={data.customizations.seo.keywords.join(', ')}
                  onChange={(e) => updateSEO('keywords', e.target.value.split(', '))}
                  placeholder="business, solution, productivity, software"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentEditor;
