
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layout, Search, Star, Download, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Templates = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // If no templates exist, create some sample ones
      if (!data || data.length === 0) {
        await createSampleTemplates();
        return;
      }
      
      setTemplates(data);
    } catch (error) {
      console.error('Error loading templates:', error);
      // Create sample templates as fallback
      createSampleTemplates();
    } finally {
      setIsLoading(false);
    }
  };

  const createSampleTemplates = async () => {
    const sampleTemplates = [
      {
        name: 'Modern Sales Proposal',
        description: 'A clean, professional template for product proposals',
        category: 'proposals',
        is_premium: false,
        template_data: {
          layout: 'modern',
          colors: ['#667eea', '#764ba2'],
          sections: ['header', 'product', 'pricing', 'cta']
        }
      },
      {
        name: 'E-commerce Product Showcase',
        description: 'Perfect for showcasing products with images and descriptions',
        category: 'landing-pages',
        is_premium: false,
        template_data: {
          layout: 'product-showcase',
          colors: ['#ff6b6b', '#4ecdc4'],
          sections: ['hero', 'features', 'testimonials', 'cta']
        }
      },
      {
        name: 'Premium Deal Banner',
        description: 'High-converting banner template for special offers',
        category: 'images',
        is_premium: true,
        template_data: {
          dimensions: '1200x630',
          style: 'gradient',
          fonts: ['Arial', 'Helvetica']
        }
      },
      {
        name: 'Service Landing Page',
        description: 'Professional template for service-based businesses',
        category: 'landing-pages',
        is_premium: false,
        template_data: {
          layout: 'service-focused',
          colors: ['#667eea', '#764ba2'],
          sections: ['hero', 'services', 'about', 'contact']
        }
      },
      {
        name: 'Social Media Promo',
        description: 'Eye-catching template for social media promotions',
        category: 'images',
        is_premium: false,
        template_data: {
          dimensions: '1080x1080',
          style: 'modern',
          fonts: ['Inter', 'Roboto']
        }
      }
    ];

    try {
      const { data, error } = await supabase
        .from('templates')
        .insert(sampleTemplates)
        .select();

      if (error) throw error;
      
      setTemplates(data || []);
      toast.success('Sample templates loaded!');
    } catch (error) {
      console.error('Error creating sample templates:', error);
      // Set fallback templates for display
      setTemplates(sampleTemplates.map((template, index) => ({
        ...template,
        id: `temp-${index}`,
        created_at: new Date().toISOString()
      })));
    }
  };

  const categories = [
    { value: 'all', label: 'All Templates' },
    { value: 'proposals', label: 'Proposals' },
    { value: 'landing-pages', label: 'Landing Pages' },
    { value: 'images', label: 'Images' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: any) => {
    toast.success(`${template.name} template selected! This would normally load the template in the respective tool.`);
  };

  const handlePreviewTemplate = (template: any) => {
    toast.info(`Previewing ${template.name}. This would show a detailed preview.`);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Templates</h1>
          <p className="text-lg text-gray-600">Loading templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Templates</h1>
        <p className="text-lg text-gray-600">Professional templates to accelerate your work</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Layout className="h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    {template.is_premium && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-yellow-600 font-medium">Premium</span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                  {template.category}
                </span>
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {/* Template Preview Area */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 flex items-center justify-center min-h-32">
                  <div className="text-center text-gray-500">
                    <Layout className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Template Preview</p>
                  </div>
                </div>
                
                {/* Template Info */}
                {template.template_data && (
                  <div className="text-xs text-gray-600 space-y-1">
                    {template.template_data.layout && (
                      <p>Layout: {template.template_data.layout}</p>
                    )}
                    {template.template_data.dimensions && (
                      <p>Size: {template.template_data.dimensions}</p>
                    )}
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1"
                    disabled={template.is_premium}
                  >
                    {template.is_premium ? 'Premium' : 'Use Template'}
                  </Button>
                  <Button 
                    onClick={() => handlePreviewTemplate(template)}
                    variant="outline"
                    size="icon"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Layout className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Templates;
