import { supabase } from '../shared/api/supabaseClient';

async function createUser() {
  const { data, error } = await supabase
    .from('usuario')
    .insert([
      {
        nombre: 'Administrador',
        email: 'admin@lacasa.com',
        rol: 'admin',
        contrasena: '123456',
      },
    ]);

  if (error) {
    console.error('❌ Error al registrar usuario:', error.message);
  } else {
    console.log('✅ Usuario creado:', data);
  }
}

createUser();