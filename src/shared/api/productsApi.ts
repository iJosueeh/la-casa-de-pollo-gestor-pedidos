import { supabase } from "@/shared/api/supabaseClient";

export const getProductos = async () => {
  const result = await supabase
    .from("producto")
    .select("*");

  console.log('Supabase response:', result);

  const { data, error } = result;

  if (error) {
    console.error("Error al obtener productos:", error.message);
    return [];
  }

  return data;
};
