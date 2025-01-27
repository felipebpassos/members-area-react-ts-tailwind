import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { useSelector } from 'react-redux';
import { fetchModules } from '../../api/modules'; // Importa a função para buscar módulos
import { fetchBanners } from '../../api/banners';
import { RootState } from '../../redux/store'; // Importa o tipo RootState

const DashboardPage: React.FC = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Referências para os vídeos
  const bannerRef = useRef<HTMLDivElement>(null);

  // Obtemos os módulos e o estado de carregamento do Redux
  const modules = useSelector((state: RootState) => state.module.modules);
  const loadedModules = useSelector((state: RootState) => state.module.loaded);
  const banners = useSelector((state: RootState) => state.banner.banners);
  const loadedBanners = useSelector((state: RootState) => state.module.loaded);

  // Função para atualizar a altura do banner
  const updateBannerHeight = () => {
    if (bannerRef.current) {
      const width = bannerRef.current.offsetWidth;
      const isSmallScreen = window.innerWidth < 500; // Verifica se a tela é menor que 500px
      const ratio = isSmallScreen ? 1 / 0.65 : 3.39 / 1; // Define o ratio com base no tamanho da tela
      const height = width / ratio;
      bannerRef.current.style.height = `${height}px`;
    }
  };

  // Função para carregar os módulos e banners
  const loadModulesAndBanners = async () => {
    if (!loadedModules) {
      await fetchModules(); // Chama a API para carregar os módulos
    }
    if (!loadedBanners) {
      await fetchBanners(); // Chama a API para carregar os banners
    }
  };

  // Carrega os módulos da API se ainda não estiverem carregados
  useEffect(() => {
    loadModulesAndBanners();
  }, [loadedModules, loadedBanners]); // Dependência para verificar quando os módulos estão carregados

  // Efeito para ajustar a altura do banner ao redimensionar a janela
  useEffect(() => {
    updateBannerHeight();
    window.addEventListener('resize', updateBannerHeight);

    return () => {
      window.removeEventListener('resize', updateBannerHeight);
    };
  }, []);

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    document.body.classList.add('is-touch');
  } else {
    document.body.classList.add('no-touch');
  }

  const handleNextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrevBanner = () => {
    setCurrentBannerIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };

  // Verifica se há banners disponíveis
  if (!banners || banners.length === 0) {
    return (
      <Layout>
        <div className="loading-overlay">
          <img src="/spinner.png" alt="Loading..." className="spinner" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Carregamento e Banner */}
      <div className="relative w-full mb-20" ref={bannerRef}>
        <div className="w-full overflow-hidden banner-container" style={{ height: '100%' }}>
          <a href={banners[currentBannerIndex].link}>
            <img
              src={banners[currentBannerIndex].image_url}
              alt={`Banner ${currentBannerIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </a>
        </div>
        <button
          onClick={handlePrevBanner}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        >
          &#10094;
        </button>
        <button
          onClick={handleNextBanner}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        >
          &#10095;
        </button>
      </div>

      {/* Módulos */}
      <div className="grid-container">
        {modules.map((module, index) => (
          <Link
            to={`/modulo/${module.id}`}
            key={module.id}
            className={`card ${module.video_cover_url && module.video_cover_url.trim() !== "" ? "has-video" : ""}`}
            onMouseEnter={() => {
              if (
                !isTouchDevice &&
                module.video_cover_url &&
                videoRefs.current[index]
              ) {
                videoRefs.current[index].currentTime = 0; // Reinicia o vídeo
                videoRefs.current[index].play(); // Reproduz o vídeo
              }
            }}
            onMouseLeave={() => {
              if (!isTouchDevice && videoRefs.current[index]) {
                videoRefs.current[index].pause(); // Pausa o vídeo ao sair
              }
            }}
          >
            <div>
              <div className="card-content">
                <img
                  src={module.cover_url}
                  alt={module.title}
                  className="card-thumb"
                />
                {module.video_cover_url && module.video_cover_url.trim() !== "" && (
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="card-video"
                    loop
                    muted
                  >
                    <source src={module.video_cover_url} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;
