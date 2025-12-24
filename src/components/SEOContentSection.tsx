import { useState } from 'react';
import { ChevronDown, ChevronUp, Tv, Wifi, Globe, Shield, Zap, Users } from 'lucide-react';

interface SEOContentSectionProps {
  brandName: string;
  channelCount: number;
  countryCount: number;
  vodCount?: number;
  primaryColor?: string;
}

function getColorWithOpacity(color: string, opacity: number): string {
  if (!color) return `rgba(59, 130, 246, ${opacity})`;
  
  if (color.startsWith('hsl')) {
    const match = color.match(/hsl\(?\s*(\d+)\s+(\d+)%\s+(\d+)%\s*\)?/);
    if (match) {
      return `hsla(${match[1]}, ${match[2]}%, ${match[3]}%, ${opacity})`;
    }
  }
  
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  if (color.startsWith('rgb')) {
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacity})`;
    }
  }
  
  return `rgba(59, 130, 246, ${opacity})`;
}

export default function SEOContentSection({
  brandName,
  channelCount,
  countryCount,
  vodCount = 50000,
  primaryColor = '#3b82f6'
}: SEOContentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const bgTint = getColorWithOpacity(primaryColor, 0.1);
  const iconColor = primaryColor.startsWith('hsl') || primaryColor.startsWith('rgb') 
    ? primaryColor 
    : primaryColor;

  const features = [
    {
      icon: Tv,
      title: 'Premium IPTV Streaming',
      description: `${brandName} delivers crystal-clear HD and 4K streaming to your favorite devices. Our advanced streaming technology ensures smooth playback without buffering, even during peak viewing hours.`
    },
    {
      icon: Globe,
      title: 'Worldwide Coverage',
      description: `Access channels from over ${countryCount}+ countries including USA, UK, Canada, Germany, France, Spain, Italy, and many more. Watch your favorite international content from anywhere in the world.`
    },
    {
      icon: Wifi,
      title: 'No Buffering Technology',
      description: 'Our global server network ensures the fastest streaming speeds with minimal latency. Enjoy uninterrupted viewing with our anti-buffering technology and load-balanced infrastructure.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your privacy matters. We use industry-standard encryption to protect your connection and never log your viewing activity. Stream with complete peace of mind.'
    },
    {
      icon: Zap,
      title: 'Instant Activation',
      description: 'Get started in minutes, not days. After purchase, your credentials are delivered instantly. Our simple setup guides help you start streaming within 5 minutes on any device.'
    },
    {
      icon: Users,
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is available around the clock via WhatsApp, Telegram, and email. Get help with setup, troubleshooting, or any questions you may have.'
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose {brandName}?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The most trusted IPTV service provider with {channelCount.toLocaleString()}+ live channels, 
            {vodCount.toLocaleString()}+ movies & series, and customers in {countryCount}+ countries.
          </p>
        </div>

        <div className="relative">
          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              !isExpanded ? 'max-h-[500px]' : 'max-h-none'
            }`}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-border">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: bgTint }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: iconColor }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-xl p-8 border border-border prose prose-lg dark:prose-invert max-w-none">
              <h3>What is IPTV and How Does {brandName} Work?</h3>
              <p>
                IPTV (Internet Protocol Television) delivers television content over the internet rather than 
                traditional cable or satellite methods. {brandName} is a premium IPTV service that provides 
                access to {channelCount.toLocaleString()}+ live TV channels and an extensive library of 
                on-demand content including movies, TV series, and sports events.
              </p>

              <h4>Key Benefits of {brandName}:</h4>
              <ul>
                <li><strong>Cost-Effective:</strong> Save up to 85% compared to traditional cable or satellite TV subscriptions</li>
                <li><strong>Multi-Device Support:</strong> Watch on Smart TVs, Android boxes, Firestick, iOS, Android phones, tablets, and more</li>
                <li><strong>HD & 4K Quality:</strong> Enjoy crystal-clear picture quality on all supported channels</li>
                <li><strong>EPG (Electronic Program Guide):</strong> Never miss your favorite shows with our comprehensive TV guide</li>
                <li><strong>Multi-Language Support:</strong> Content available in multiple languages including English, Spanish, French, German, Arabic, and more</li>
                <li><strong>DVR & Catch-Up:</strong> Record live TV and watch programs you missed for up to 7 days</li>
              </ul>

              <h4>Compatible Devices and Apps</h4>
              <p>
                {brandName} works seamlessly with all popular IPTV apps including IPTV Smarters Pro, TiviMate, 
                GSE Smart IPTV, and more. Our service is compatible with Android TV, Amazon Fire TV, Apple TV, 
                Roku, Samsung and LG Smart TVs, Windows and Mac computers, and all iOS and Android mobile devices.
              </p>

              <h4>Sports Coverage</h4>
              <p>
                Never miss a game with our comprehensive sports coverage. Watch live Premier League, La Liga, 
                Serie A, Bundesliga, NFL, NBA, UFC, Boxing, F1, and all major sporting events from around the world. 
                Our dedicated sports channels deliver every match in crystal-clear HD quality.
              </p>

              <h4>Entertainment & Movies</h4>
              <p>
                With {vodCount.toLocaleString()}+ movies and TV series on demand, you'll never run out of things to watch. 
                Our library is updated daily with the latest releases, classic films, and binge-worthy TV shows. 
                Browse by genre, year, or rating to find your perfect entertainment.
              </p>
            </div>
          </div>

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none" />
          )}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card font-medium transition-all hover:bg-accent"
          >
            {isExpanded ? (
              <>
                Show Less
                <ChevronUp className="h-5 w-5" />
              </>
            ) : (
              <>
                Learn More About {brandName}
                <ChevronDown className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
