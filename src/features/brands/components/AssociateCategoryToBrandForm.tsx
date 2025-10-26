import { toast } from "sonner";
import LoadingIndicator from "../../../shared/components/LoaderIndicator";
import { useAssociateCategoryToBrand } from "../hooks/useAssociateCategoryToBrand";
import { useGetCategories } from "../hooks/useGetCategories";
import { BrandResponse } from "../interfaces/brand-response.interface";

interface AssociateCategoryToBrandFormProps {
  brand: BrandResponse;
}

export default function AssociateCategoryToBrandForm({
  brand,
}: AssociateCategoryToBrandFormProps) {
  const { categories, isLoading } = useGetCategories(brand.id);

  const { associate, isPending, category, setCategory } =
    useAssociateCategoryToBrand(brand.id);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!category) {
      toast.error("Por favor, seleccioná una categoría para asociar.");
      return;
    }

    await associate(category.id);
  };

  const onSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categories.find(
      (cat) => cat.name === e.target.value
    );
    setCategory(selectedCategory || null);
  };

  return (
    <>
      {isLoading && (
        <LoadingIndicator isLoading message="Cargando categorías..." />
      )}
      <form
        onSubmit={handleSubmit}
        className="theme-card p-3"
        style={{
          maxWidth: 720,
          margin: "0 auto 28px",
          padding: 18,
          borderRadius: 14,
        }}
      >
        <div className="mb-3">
          <label htmlFor="category-select" className="form-label">
            Select a category:
          </label>
          <select
            id="category-select"
            className="form-select"
            onChange={(e) => onSelectCategory(e)}
          >
            <option value={""}>-- Seleccioná una categoría --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success" disabled={isPending}>
          {isPending ? "Asociando..." : "Asociar Categoría"}
        </button>
      </form>
    </>
  );
}
