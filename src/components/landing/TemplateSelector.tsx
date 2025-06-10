
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Eye } from 'lucide-react';
import { LandingTemplate } from '@/types/landing-templates';
import { landingTemplates } from '@/data/landing-templates';

interface TemplateSelectorProps {
  selectedTemplate: string | null;
  onSelectTemplate: (template: LandingTemplate) => void;
  onPreviewTemplate: (template: LandingTemplate) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate,
  onPreviewTemplate
}) => {
  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'startup', name: 'Startup' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'agency', name: 'Agency' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'creative', name: 'Creative' }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredTemplates = landingTemplates.filter(
    template => selectedCategory === 'all' || template.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Template</h2>
        <p className="text-gray-600">Select a professional template to get started</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card 
            key={template.id} 
            className={`group hover:shadow-lg transition-all cursor-pointer ${
              selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {template.isPremium && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500">
                    <Star className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                  <Button
                    onClick={() => onPreviewTemplate(template)}
                    variant="secondary"
                    size="sm"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
              <CardDescription className="mb-3">{template.description}</CardDescription>
              <Badge variant="outline" className="mb-3 capitalize">
                {template.category}
              </Badge>
              <Button
                onClick={() => onSelectTemplate(template)}
                className="w-full"
                disabled={template.isPremium}
              >
                {template.isPremium ? 'Premium Required' : 'Use Template'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
