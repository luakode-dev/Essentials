import { createClient } from '@supabase/supabase-js';

// En Astro, podemos usar import.meta.env para leer variables de entorno en el cliente
// Para exponer variables desde el lado cliente deben llamarse con el prefijo PUBLIC_
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://qxowmwbcxifxjgdfvxbk.supabase.co';
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_vk33MCKYF0iJSICEHJoPXg_sGc8tzDk';

export const supabase = createClient(supabaseUrl, supabaseKey);
