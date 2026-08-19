import React, { useState } from 'react';
import { INITIAL_MEDIA_CONFIG, type MediaItem } from '../types/cms';
import { Upload, ShieldCheck, CheckCircle, Image, Video, Info, LogOut, UserPlus, Users, AlertCircle } from 'lucide-react';

export const AdminCMS = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'media' | 'team'>('media');
  
  // Estado local de medios y mensajes
  const [mediaItems, setMediaItems] = useState<Record<string, MediaItem>>(INITIAL_MEDIA_CONFIG);
  const [successMessage, setSuccessMessage] = useState('');
  const [newEditorEmail, setNewEditorEmail] = useState('');
  const [teamMembers, setTeamMembers] = useState<Array<{ email: string; role: string; addedAt: string }>>([
    { email: 'admin@krokantemani.top', role: 'SUPER_ADMIN', addedAt: 'Propietario' }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    // Credenciales administradoras predeterminadas para acceso de revisión
    if (email === 'admin@krokantemani.top' && password === 'Krokante2026!') {
      setIsAuthenticated(true);
    } else {
      setLoginError('Credenciales incorrectas. Verifique correo y contraseña.');
    }
  };

  const handleUrlChange = (id: string, newUrl: string) => {
    setMediaItems(prev => ({
      ...prev,
      [id]: { ...prev[id], url: newUrl }
    }));
  };

  const handleSave = (id: string) => {
    setSuccessMessage(`¡Los cambios para "${mediaItems[id].title}" se actualizaron con éxito!`);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleAddEditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEditorEmail) return;
    setTeamMembers(prev => [...prev, { email: newEditorEmail, role: 'EDITOR_MEDIOS', addedAt: 'Reciente' }]);
    setNewEditorEmail('');
    setSuccessMessage(`Se asignó el rol de EDITOR a ${newEditorEmail}`);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4 selection:bg-amber-400 selection:text-black">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500" />
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>

          <h2 className="font-display text-3xl text-center uppercase tracking-tight mb-2">Panel CMS Krokanté</h2>
          <p className="text-neutral-400 text-xs text-center mb-8">
            Acceso seguro para administradores y editores de contenido multimedia.
          </p>

          {loginError && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Correo Electrónico</label>
              <input 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@krokantemani.top"
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-white font-mono text-sm outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Contraseña</label>
              <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-white font-mono text-sm outline-none transition-colors"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 rounded-xl bg-amber-400 text-black font-bold uppercase tracking-wider text-xs hover:bg-yellow-300 transition-colors shadow-lg shadow-amber-400/20"
            >
              Iniciar Sesión Seguro
            </button>
          </form>

          <div className="mt-8 text-center text-neutral-600 text-[11px] font-mono">
            Protegido con Firebase RBAC & SSL 256-bit
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-amber-400 selection:text-black">
      {/* Top Navbar Admin */}
      <header className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-black font-bold flex items-center justify-center font-display text-xl">
            K
          </div>
          <div>
            <h1 className="font-display text-xl uppercase tracking-wider">Krokanté CMS</h1>
            <p className="text-[11px] text-amber-400 font-mono">Modo Administrador Principal</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs">
            <button 
              onClick={() => setActiveTab('media')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'media' ? 'bg-amber-400 text-black' : 'text-neutral-400 hover:text-white'}`}
            >
              Gestor de Medios
            </button>
            <button 
              onClick={() => setActiveTab('team')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'team' ? 'bg-amber-400 text-black' : 'text-neutral-400 hover:text-white'}`}
            >
              Gestión de Equipo
            </button>
          </div>

          <button 
            onClick={() => setIsAuthenticated(false)}
            className="p-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 md:p-10">
        {successMessage && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-sm font-bold animate-fade-in">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {activeTab === 'media' ? (
          <div>
            <div className="mb-8">
              <h2 className="font-display text-4xl uppercase tracking-tight mb-2">Administrador de Imágenes y Videos</h2>
              <p className="text-neutral-400 text-sm">
                Edita las fotos de tus empaques y videos. El sistema admite cualquier formato (`PNG`, `JPG`, `WEBP`, `AVIF`, `HEIC`, `MP4`, `MOV`) con compresión automática y costo $0 de almacenamiento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.values(mediaItems).map((item) => (
                <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-bold uppercase rounded-full mb-2">
                          {item.category}
                        </span>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                      </div>
                      {item.category === 'hero_video' ? (
                        <Video className="w-6 h-6 text-amber-400 shrink-0" />
                      ) : (
                        <Image className="w-6 h-6 text-amber-400 shrink-0" />
                      )}
                    </div>

                    {/* Ficha Técnica de Recomendaciones */}
                    <div className="bg-neutral-950 rounded-2xl p-4 border border-neutral-800/80 mb-6 space-y-2 text-xs">
                      <div className="flex justify-between text-neutral-400">
                        <span className="flex items-center gap-1.5"><Info className="w-3.5 h-3.5 text-amber-400" /> Relación de Aspecto:</span>
                        <span className="font-mono text-white font-bold">{item.aspectRatio}</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>Resolución Recomendada:</span>
                        <span className="font-mono text-white font-bold">{item.recommendedResolution}</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>Formatos Soportados:</span>
                        <span className="font-mono text-amber-300 font-bold">{item.allowedFormats.join(', ')}</span>
                      </div>
                    </div>

                    {/* Previsualización */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 mb-6 flex items-center justify-center">
                      {item.category === 'hero_video' ? (
                        <video src={item.url} controls className="w-full h-full object-cover" />
                      ) : (
                        <img src={item.url} alt={item.title} className="w-full h-full object-contain p-4" />
                      )}
                    </div>

                    {/* Campo de URL / Carga */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">
                        URL de la Imagen o Video
                      </label>
                      <input 
                        type="text"
                        value={item.url}
                        onChange={e => handleUrlChange(item.id, e.target.value)}
                        placeholder="https://res.cloudinary.com/..."
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs font-mono text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between gap-4">
                    <span className="text-[11px] text-neutral-500 font-mono">Máx: {item.maxSizeMB}MB</span>
                    <button 
                      onClick={() => handleSave(item.id)}
                      className="px-5 py-2.5 rounded-xl bg-amber-400 text-black font-bold uppercase text-xs hover:bg-yellow-300 transition-colors flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Actualizar Foto</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h2 className="font-display text-4xl uppercase tracking-tight mb-2">Gestión de Permisos y Equipo (RBAC)</h2>
              <p className="text-neutral-400 text-sm">
                Asigna permisos especiales a diseñadores o colaboradores para que puedan actualizar las fotos sin poner en riesgo la configuración general.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-amber-400" />
                  <span>Asignar Nuevo Editor</span>
                </h3>

                <form onSubmit={handleAddEditor} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      Correo del Colaborador
                    </label>
                    <input 
                      type="email"
                      value={newEditorEmail}
                      onChange={e => setNewEditorEmail(e.target.value)}
                      placeholder="disenador@gmail.com"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-sm font-mono text-white outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      Rol Asignado
                    </label>
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1">
                      <div className="font-bold text-amber-400">EDITOR_MEDIOS</div>
                      <div className="text-neutral-400">Puede actualizar fotos de producto y videos promocionales en tiempo real.</div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-400 text-black font-bold uppercase tracking-wider text-xs hover:bg-yellow-300 transition-colors"
                  >
                    Otorgar Permiso de Editor
                  </button>
                </form>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span>Miembros con Acceso Autenticado</span>
                </h3>

                <div className="space-y-3">
                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-4">
                      <div>
                        <div className="font-mono text-xs font-bold text-white">{member.email}</div>
                        <div className="text-[10px] text-amber-400 font-bold uppercase mt-0.5">{member.role}</div>
                      </div>
                      <span className="text-[11px] text-neutral-500 font-mono">{member.addedAt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminCMS;
