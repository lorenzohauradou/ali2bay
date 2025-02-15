import { Rocket, Banknote, Trophy, ArrowRight } from "lucide-react"
import Button from "@/app/components/ui/Button"

export default function Features() {
    const features = [
      {
        icon: <Rocket className="h-8 w-8 text-[#0066CC]" />,
        title: "Vendi senza sforzi",
        description: "Basta <span class='font-semibold text-gray-600'>collegarti</span> a <span class='font-semibold text-gray-600'>eBay</span> e incollare i link. Il sistema fa tutto il resto per te."
      },
      {
        icon: <Banknote className="h-8 w-8 text-[#0066CC]" />,
        title: "Più profitti, meno lavoro",
        description: "Ottimizza <span class='font-semibold text-gray-600'>immagini</span>, <span class='font-semibold text-gray-600'>prezzi</span> e <span class='font-semibold text-gray-600'>descrizioni</span> in automatico utilizzando <span class='font-semibold text-gray-600'>l'intelligenza artificiale</span> per massimizzare i guadagni."
      },
      {
        icon: <Trophy className="h-8 w-8 text-[#0066CC]" />,
        title: "Trova i prodotti migliori",
        description: "Scopri cosa <span class='font-semibold text-gray-600'>funziona</span> su <span class='font-semibold text-gray-600'>eBay</span> e inizia a <span class='font-semibold text-gray-600'>venderlo</span> subito.",
        action: (
          <div className="flex justify-center mt-4">
            <Button 
              variant="secondary"
              size="sm"
              href="/prodotti-vincenti"
              icon={ArrowRight}
              iconPosition="right"
            >
              Scopri
            </Button>
          </div>
        )
      }
    ]
  
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="flex justify-center">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                    <p 
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{ __html: feature.description }}
                    />
                    {feature.action && feature.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }