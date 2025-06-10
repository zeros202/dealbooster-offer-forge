
import React from 'react';
import { LandingTemplate, LandingPageData, ColorScheme } from '@/types/landing-templates';
import { landingTemplates, fontOptions } from '@/data/landing-templates';

interface TemplateRendererProps {
  template: LandingTemplate;
  data: LandingPageData;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({ template, data }) => {
  const colorScheme = template.colorSchemes.find(scheme => scheme.id === data.colorSchemeId) || template.colorSchemes[0];
  const font = fontOptions.find(f => f.id === data.customizations.font) || fontOptions[0];

  const generateHTML = () => {
    const heroContent = data.content.hero || {};
    const featuresContent = data.content.features || {};
    const pricingContent = data.content.pricing || {};

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.customizations.seo.title}</title>
    <meta name="description" content="${data.customizations.seo.description}">
    <meta name="keywords" content="${data.customizations.seo.keywords.join(', ')}">
    <link href="https://fonts.googleapis.com/css2?family=${font.family.split(',')[0].replace(' ', '+')}&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: ${font.family};
            line-height: 1.6;
            color: ${colorScheme.text};
            background-color: ${colorScheme.background};
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: linear-gradient(135deg, ${colorScheme.primary} 0%, ${colorScheme.secondary} 100%);
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover;
            opacity: 0.1;
            z-index: 1;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            max-width: 800px;
        }
        
        .hero h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 700;
            margin-bottom: 1.5rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            ${data.customizations.animations ? 'animation: fadeInUp 1s ease-out;' : ''}
        }
        
        .hero p {
            font-size: clamp(1.2rem, 2.5vw, 1.5rem);
            margin-bottom: 2rem;
            opacity: 0.9;
            ${data.customizations.animations ? 'animation: fadeInUp 1s ease-out 0.3s both;' : ''}
        }
        
        .cta-button {
            display: inline-block;
            padding: 1rem 2.5rem;
            background: ${colorScheme.accent};
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            ${data.customizations.animations ? 'animation: fadeInUp 1s ease-out 0.6s both;' : ''}
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }
        
        /* Features Section */
        .features {
            padding: 100px 0;
            background: ${colorScheme.background};
        }
        
        .features h2 {
            text-align: center;
            font-size: 3rem;
            margin-bottom: 3rem;
            color: ${colorScheme.primary};
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .feature-card {
            background: white;
            padding: 2.5rem;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
            border: 2px solid transparent;
        }
        
        .feature-card:hover {
            transform: translateY(-10px);
            border-color: ${colorScheme.primary};
        }
        
        .feature-icon {
            font-size: 3rem;
            margin-bottom: 1.5rem;
            display: block;
        }
        
        .feature-card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: ${colorScheme.primary};
        }
        
        .feature-card p {
            color: ${colorScheme.text};
            opacity: 0.8;
        }
        
        /* Pricing Section */
        .pricing {
            padding: 100px 0;
            background: linear-gradient(45deg, ${colorScheme.primary}15, ${colorScheme.secondary}15);
        }
        
        .pricing h2 {
            text-align: center;
            font-size: 3rem;
            margin-bottom: 3rem;
            color: ${colorScheme.primary};
        }
        
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .pricing-card {
            background: white;
            padding: 3rem 2rem;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 15px 40px rgba(0,0,0,0.1);
            position: relative;
            transition: transform 0.3s ease;
        }
        
        .pricing-card:hover {
            transform: scale(1.05);
        }
        
        .pricing-card.popular {
            border: 3px solid ${colorScheme.accent};
            transform: scale(1.05);
        }
        
        .pricing-card.popular::before {
            content: 'Most Popular';
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: ${colorScheme.accent};
            color: white;
            padding: 0.5rem 2rem;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .price {
            font-size: 3rem;
            font-weight: 700;
            color: ${colorScheme.primary};
            margin: 1rem 0;
        }
        
        .price-period {
            font-size: 1rem;
            color: ${colorScheme.text};
            opacity: 0.7;
        }
        
        /* Footer */
        .footer {
            background: ${colorScheme.primary};
            color: white;
            padding: 3rem 0;
            text-align: center;
        }
        
        /* Animations */
        ${data.customizations.animations ? `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        ` : ''}
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .hero p {
                font-size: 1.2rem;
            }
            
            .features h2,
            .pricing h2 {
                font-size: 2rem;
            }
            
            .feature-card,
            .pricing-card {
                padding: 2rem 1.5rem;
            }
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>${heroContent.headline || 'Transform Your Business Today'}</h1>
                <p>${heroContent.subheadline || 'Discover the solution that will revolutionize the way you work and help you achieve incredible results.'}</p>
                <a href="${heroContent.ctaLink || '#'}" class="cta-button">${heroContent.ctaText || 'Get Started Now'}</a>
            </div>
        </div>
    </section>
    
    <!-- Features Section -->
    ${template.sections.find(s => s.id === 'features') ? `
    <section class="features">
        <div class="container">
            <h2>${featuresContent.title || 'Why Choose Us?'}</h2>
            <div class="features-grid">
                ${(featuresContent.features || '🚀 Fast & Reliable\\nGet results quickly with our optimized solutions\\n\\n🎯 Targeted Results\\nPrecision-focused approach that delivers exactly what you need\\n\\n💎 Premium Quality\\nTop-tier quality standards ensuring the best value for your investment').split('\\n\\n').map(feature => {
                  const [icon, title, ...descParts] = feature.split('\\n');
                  const description = descParts.join(' ');
                  return `
                    <div class="feature-card">
                        <span class="feature-icon">${icon}</span>
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                  `;
                }).join('')}
            </div>
        </div>
    </section>
    ` : ''}
    
    <!-- Pricing Section -->
    ${template.sections.find(s => s.id === 'pricing') ? `
    <section class="pricing">
        <div class="container">
            <h2>${pricingContent.title || 'Choose Your Plan'}</h2>
            <div class="pricing-grid">
                ${(() => {
                  try {
                    const plans = JSON.parse(pricingContent.plans || '[{"name": "Basic", "price": "$29", "period": "/month", "features": ["Feature 1", "Feature 2", "Feature 3"], "popular": false}, {"name": "Pro", "price": "$59", "period": "/month", "features": ["Everything in Basic", "Advanced Features", "Priority Support", "Custom Integrations"], "popular": true}, {"name": "Enterprise", "price": "$99", "period": "/month", "features": ["Everything in Pro", "Unlimited Users", "White Label", "Dedicated Support"], "popular": false}]');
                    return plans.map(plan => `
                      <div class="pricing-card ${plan.popular ? 'popular' : ''}">
                          <h3>${plan.name}</h3>
                          <div class="price">${plan.price}<span class="price-period">${plan.period || '/month'}</span></div>
                          <ul style="list-style: none; padding: 0; margin: 2rem 0;">
                              ${plan.features.map(feature => `<li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">✓ ${feature}</li>`).join('')}
                          </ul>
                          <a href="#" class="cta-button" style="display: inline-block; margin-top: 1rem;">Choose Plan</a>
                      </div>
                    `).join('');
                  } catch {
                    return '<div class="pricing-card"><h3>Basic Plan</h3><div class="price">$29<span class="price-period">/month</span></div><p>Perfect for getting started</p></div>';
                  }
                })()}
            </div>
        </div>
    </section>
    ` : ''}
    
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
  };

  return (
    <div className="w-full h-full">
      <iframe
        srcDoc={generateHTML()}
        className="w-full h-full border-0"
        title="Landing Page Preview"
      />
    </div>
  );
};

export default TemplateRenderer;
