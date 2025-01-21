import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

const DashboardPage: React.FC = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento dos vídeos
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Referências para os vídeos
  const bannerRef = useRef<HTMLDivElement>(null);

  const banners = [
    {
      link: 'https://example.com/banner1',
      imageUrl: 'https://ultimatemembers.s3.eu-north-1.amazonaws.com/banners/banner1.png',
    },
    {
      link: 'https://example.com/banner2',
      imageUrl: 'https://ultimatemembers.s3.eu-north-1.amazonaws.com/banners/banner2.jpg',
    },
  ];

  const modules = [
    {
      id: 1,
      title: 'Módulo 1: Introdução',
      thumbUrl: 'https://ultimatemembers.s3.eu-north-1.amazonaws.com/thumb_modulos/thumb1.png',
      videoUrl: 'https://ultimatemembers.s3.eu-north-1.amazonaws.com/videos/Modulo01.mp4',
    },
    {
      id: 2,
      title: 'Módulo 2: Storytelling',
      thumbUrl: 'https://ultimatemembers.s3.eu-north-1.amazonaws.com/thumb_modulos/thumb2.png',
      videoUrl: 'https://ultimatemembers.s3.eu-north-1.amazonaws.com/videos/Modulo01.mp4',
    },
    {
      id: 3,
      title: 'Módulo 3: Avançado',
      thumbUrl: 'https://ultimatemembers.s3.eu-north-1.amazonaws.com/thumb_modulos/thumb3.png',
      videoUrl: 'https://ultimatemembers.s3.eu-north-1.amazonaws.com/videos/Modulo01.mp4',
    },
    {
      id: 4,
      title: 'Módulo 4: Fundamentos I',
      thumbUrl: 'https://ultimatemembers.s3.eu-north-1.amazonaws.com/thumb_modulos/thumb4.png',
      videoUrl: 'https://ultimatemembers.s3.eu-north-1.amazonaws.com/videos/Modulo01.mp4',
    },
    {
      id: 5,
      title: 'Módulo 5: Fundamentos II',
      thumbUrl: 'https://ultimatemembers.s3.eu-north-1.amazonaws.com/thumb_modulos/thumb5.png',
      videoUrl: 'https://ultimatemembers.s3.eu-north-1.amazonaws.com/videos/Modulo01.mp4',
    },
  ];

  const updateBannerHeight = () => {
    if (bannerRef.current) {
      const width = bannerRef.current.offsetWidth;
      const isSmallScreen = window.innerWidth < 500; // Verifica se a tela é menor que 500px
      const ratio = isSmallScreen ? 1 / 0.65 : 3.39 / 1; // Define o ratio com base no tamanho da tela
      const height = width / ratio;
      bannerRef.current.style.height = `${height}px`;
    }
  };

  useEffect(() => {
    updateBannerHeight();
    window.addEventListener('resize', updateBannerHeight);

    return () => {
      window.removeEventListener('resize', updateBannerHeight);
    };
  }, []);

  // Verifica se todos os vídeos estão carregados
  const handleVideoLoaded = () => {
    const allLoaded = videoRefs.current.every((video) => video?.readyState === 4);
    if (allLoaded) setLoading(false);
  };

  // Função para verificar se os vídeos estão carregados
  useEffect(() => {
    setLoading(true); // Começa o carregamento
    const timeoutId = setTimeout(() => {
      setLoading(false); // Finaliza o carregamento após 3 segundos
    }, 3000);

    if (videoRefs.current.length > 0) {
      const allVideos = videoRefs.current;
      const allLoaded = allVideos.every((video) => video?.readyState === 4);

      if (allLoaded) {
        setLoading(false); // Finaliza se todos os vídeos estiverem carregados antes do timeout
        clearTimeout(timeoutId);
      }
    }

    return () => {
      clearTimeout(timeoutId); // Limpa o timeout quando o componente for desmontado
    };
  }, [modules]);

  const handleNextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrevBanner = () => {
    setCurrentBannerIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };

  return (
    <Layout>
      {loading && (
        <div className="loading-overlay">
          <img
            src="/spinner.png"
            alt="Loading..."
            className="spinner"
          />
        </div>
      )}

      <div className="relative w-full mb-20" ref={bannerRef}>
        <div className="w-full overflow-hidden banner-container" style={{ height: '100%' }}>
          <a href={banners[currentBannerIndex].link}>
            <img
              src={banners[currentBannerIndex].imageUrl}
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

      <div className="grid-container">
        {modules.map((module, index) => (
          <Link
            to={`/modulo/${module.id}`}
            key={module.id}
            className="card"
            onMouseEnter={() => {
              if (videoRefs.current[index]) {
                videoRefs.current[index].currentTime = 0; // Reinicia o vídeo
                videoRefs.current[index].play(); // Reproduz o vídeo
              }
            }}
            onMouseLeave={() => {
              if (videoRefs.current[index]) {
                videoRefs.current[index].pause(); // Pausa o vídeo ao sair
              }
            }}
          >
            <div>
              <div className="card-content">
                <img
                  src={module.thumbUrl}
                  alt={module.title}
                  className="card-thumb"
                />
                {module.videoUrl && (
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="card-video"
                    loop
                    muted
                    onLoadedData={handleVideoLoaded}
                  >
                    <source src={module.videoUrl} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="card-footer">
                <h3 className="card-title">{module.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;
