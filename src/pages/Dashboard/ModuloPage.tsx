import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import VideoPlayer from '../../components/VideoPlayer';
import { useSelector } from 'react-redux';
import { fetchModules, fetchLessonsByModule } from '../../api/modules'; // Funções de API
import { RootState } from '../../redux/store';

const ModuloPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(true);

  // Pegando o estado global
  const modules = useSelector((state: RootState) => state.module.modules);
  const lessonsByModule = useSelector((state: RootState) => state.module.lessonsByModule);
  
  const modulo = modules.find((module) => module.id === parseInt(id || '')) || null;
  const lessons = lessonsByModule[parseInt(id || '')] || [];

  useEffect(() => {
    if (!id) {
      // Redireciona para /notfound se o id não for passado
      navigate('/notfound');
      return;
    }

    if (!modulo) {
      // Se o módulo não for encontrado, buscamos os módulos e depois verificamos se o módulo existe
      fetchModules();
    } else {
      // Buscando as aulas do módulo específico
      fetchLessonsByModule(modulo.id);
    }

    setLoading(false);
  }, [id, modulo, navigate]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <img
          src="/spinner.png" // Coloque o caminho correto para o seu arquivo de imagem
          alt="Loading..."
          className="spinner"
        />
      </div>
    );
  }

  if (!modulo) {
    navigate('/notfound');
    return;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold mt-8 mb-12 text-normal text-center">
          Módulo {modulo.id} - {modulo.title}
        </h2>
        <div className="space-y-4">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-6 rounded shadow-md hover:shadow-lg flex flex-col sm:flex-row items-center sm:items-start hover:bg-bluebg"
              >
                {lesson.video && (
                  <VideoPlayer
                    videoUrl={lesson.video}
                    title={`Video Aula ${lesson.id}`}
                    platform={lesson.platform}
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-lg sm:text-base md:text-lg font-bold mb-2 text-lighter">
                    {lesson.title}
                  </h3>
                  <p className="text-base sm:text-sm md:text-base text-light">
                    {lesson.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Não há aulas para este módulo.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ModuloPage;
