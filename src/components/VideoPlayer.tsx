import React from "react";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  platform: string;  // Tipos para platform
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, platform }) => {
  const renderPlayer = () => {
    switch (platform) {
      case "AWS":
        return (
          <div style={{ padding: "40% 0 0 0", position: "relative" }}>
            <video
              controls
              src={videoUrl}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
              title={title}
            />
          </div>
        );
      case "Vimeo":
        return (
          <div style={{ padding: "40% 0 0 0", position: "relative" }}>
            <iframe
              src={videoUrl}  // Agora passamos diretamente a URL do Vimeo
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
              title={title}
            ></iframe>
          </div>
        );
      case "Panda":
        return (
          <div style={{ padding: "40% 0 0 0", position: "relative" }}>
            <iframe
              src={videoUrl}  // Passamos diretamente a URL do Panda
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
              title={title}
            ></iframe>
          </div>
        );
      case "YouTube":
        // Para o YouTube, extraímos a chave do vídeo da URL
        const videoId = videoUrl.split("v=")[1]?.split("&")[0];  // Pegando o ID do vídeo após 'v='
        return (
          <div style={{ padding: "40% 0 0 0", position: "relative" }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
              title={title}
            ></iframe>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="w-full sm:w-1/4 mb-4 sm:mb-0 sm:mr-4"
      style={{ width: "600px", maxWidth: "100%" }} // Definindo largura mínima
    >
      {renderPlayer()}
    </div>
  );
};

export default VideoPlayer;
