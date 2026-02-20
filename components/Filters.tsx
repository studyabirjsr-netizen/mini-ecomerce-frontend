import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FiltersProps {
  categories: (string | any)[];
  selectedCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
}

const Filters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  maxPrice,
  onPriceChange,
}: FiltersProps) => (
  <div className="mb-8 space-y-6 p-6 bg-card rounded-2xl shadow-lg border">
    {/* Category filter */}
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Category
      </h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="all-categories"
            checked={selectedCategory === null}
            onCheckedChange={() => onCategoryChange(null)}
          />
          <Label htmlFor="all-categories">All</Label>
        </div>
        {categories
          .map((cat, index) => {
            const key = typeof cat === 'string' ? cat : `cat-${index}`;
            const displayCat = typeof cat === 'string' ? cat : '';
            
            if (!displayCat.trim()) return null;
            
            return (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={selectedCategory === displayCat}
                  onCheckedChange={() => onCategoryChange(displayCat)}
                />
                <Label htmlFor={key} className="capitalize">{displayCat}</Label>
              </div>
            );
          })
          .filter(Boolean)}
      </div>
    </div>

    {/* Price filter */}
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Price Range
      </h3>
      <Slider
        min={0}
        max={Math.ceil(maxPrice)}
        step={5}
        value={priceRange}
        onValueChange={(v) => onPriceChange(v as [number, number])}
        className="w-full max-w-md"
      />
      <p className="mt-3 text-base font-mono font-semibold text-foreground">
        ${priceRange[0].toFixed(0)} — ${priceRange[1].toFixed(0)}
      </p>
    </div>
  </div>
);

export default Filters;
