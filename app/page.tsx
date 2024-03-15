
import cloudinary from "cloudinary";
import UploadButton from "./gallery/upload-button";
import { SearchForm } from "./gallery/search-form";
import GalleryGrid from "./gallery/gallery-grid";


export type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function GalleryPage({
  searchParams: { search },
}: {
  searchParams: {
    search: string;
  };
}) {
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image${search ? ` AND tags=${search}` : ""}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <div className="flex flex-col gap-8 px-3">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadButton />
        </div>

        <SearchForm initialSearch={search} />

        <GalleryGrid images={results.resources} />
      </div>
    </section>
  );
}