import EditBlogForm from "@/components/EditBlogForm";

export default async function EditBlogPage({
  params,
}: PageProps<"/blogs/[id]/edit">) {
  const { id } = await params;
  return <EditBlogForm id={id} />;
}
