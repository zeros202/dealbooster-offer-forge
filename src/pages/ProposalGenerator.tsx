
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Download, Save, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ProposalGenerator = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    originalPrice: '',
    discountPrice: '',
    urgencyHours: '24',
    whatsappNumber: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProposal, setGeneratedProposal] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateProposal = () => {
    setIsGenerating(true);
    
    // Simulate AI generation with a realistic delay
    setTimeout(() => {
      const proposal = `
🔥 EXCLUSIVE OFFER - LIMITED TIME! 🔥

${formData.productName}

${formData.productDescription}

💰 SPECIAL PRICING:
❌ Regular Price: $${formData.originalPrice}
✅ Your Price TODAY: $${formData.discountPrice}
💡 You SAVE: $${(parseFloat(formData.originalPrice) - parseFloat(formData.discountPrice)).toFixed(2)}

⏰ This offer expires in ${formData.urgencyHours} hours!

🎯 Why choose us?
✓ Premium quality guaranteed
✓ Fast delivery
✓ 100% satisfaction guarantee
✓ Exclusive customer support

Don't miss out on this incredible deal!

📱 Order NOW via WhatsApp: ${formData.whatsappNumber}

*Limited quantities available. First come, first served!*
      `;
      
      setGeneratedProposal(proposal.trim());
      setIsGenerating(false);
      toast.success('Proposal generated successfully!');
    }, 2000);
  };

  const handleSave = async () => {
    if (!user || !generatedProposal) {
      toast.error('Please log in and generate a proposal first');
      return;
    }

    try {
      const { error } = await supabase
        .from('sales_proposals')
        .insert({
          user_id: user.id,
          product_name: formData.productName,
          product_description: formData.productDescription,
          original_price: parseFloat(formData.originalPrice),
          discount_price: parseFloat(formData.discountPrice),
          urgency_hours: parseInt(formData.urgencyHours),
          whatsapp_number: formData.whatsappNumber,
          pdf_data: generatedProposal
        });

      if (error) throw error;
      
      toast.success('Proposal saved successfully!');
    } catch (error) {
      console.error('Error saving proposal:', error);
      toast.error('Failed to save proposal');
    }
  };

  const handleDownload = () => {
    if (!generatedProposal) return;
    
    const blob = new Blob([generatedProposal], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.productName || 'proposal'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Proposal Generator</h1>
        <p className="text-lg text-gray-600">Create compelling sales proposals in seconds</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Product Details
            </CardTitle>
            <CardDescription>
              Fill in your product information to generate a sales proposal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="product-name">Product Name *</Label>
              <Input
                id="product-name"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                placeholder="Enter product name..."
              />
            </div>

            <div>
              <Label htmlFor="product-description">Product Description *</Label>
              <Textarea
                id="product-description"
                value={formData.productDescription}
                onChange={(e) => handleInputChange('productDescription', e.target.value)}
                placeholder="Describe your product benefits and features..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="original-price">Original Price ($) *</Label>
                <Input
                  id="original-price"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                  placeholder="99.99"
                />
              </div>
              <div>
                <Label htmlFor="discount-price">Discount Price ($) *</Label>
                <Input
                  id="discount-price"
                  type="number"
                  value={formData.discountPrice}
                  onChange={(e) => handleInputChange('discountPrice', e.target.value)}
                  placeholder="49.99"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="urgency-hours">Offer Expires In (hours)</Label>
              <Input
                id="urgency-hours"
                type="number"
                value={formData.urgencyHours}
                onChange={(e) => handleInputChange('urgencyHours', e.target.value)}
                placeholder="24"
              />
            </div>

            <div>
              <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
              <Input
                id="whatsapp-number"
                value={formData.whatsappNumber}
                onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                placeholder="+1234567890"
              />
            </div>

            <Button 
              onClick={generateProposal}
              disabled={!formData.productName || !formData.productDescription || isGenerating}
              className="w-full"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate Proposal'}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Proposal */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Proposal</CardTitle>
            <CardDescription>
              Your AI-powered sales proposal will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedProposal ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {generatedProposal}
                  </pre>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex-1">
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
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Fill in the form and click "Generate Proposal" to see your AI-powered sales copy</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProposalGenerator;
