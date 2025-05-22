'use client';

export function ShareButton({ link }: { link: string }) {
  const handleNativeShare = async (link: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Veja isso!',
          text: 'Muito interessante!',
          url: link,
        });
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else {
      alert('Compartilhamento não suportado no seu navegador.');
    }
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleNativeShare(link);
      }}
    >
      <span className="ms-3" style={{ fontSize: '1.2rem' }}>
        ⋮
      </span>
    </div>
  );
}
