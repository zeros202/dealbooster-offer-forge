
export interface LandingTemplate {
  id: string;
  name: string;
  category: 'startup' | 'ecommerce' | 'agency' | 'corporate' | 'creative';
  description: string;
  preview: string;
  isPremium: boolean;
  colorSchemes: ColorScheme[];
  sections: TemplateSection[];
}

export interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface TemplateSection {
  id: string;
  type: 'hero' | 'features' | 'pricing' | 'testimonials' | 'cta' | 'footer';
  name: string;
  required: boolean;
  content: any;
}

export interface LandingPageData {
  templateId: string;
  colorSchemeId: string;
  content: {
    [sectionId: string]: any;
  };
  customizations: {
    font: string;
    animations: boolean;
    seo: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
}
