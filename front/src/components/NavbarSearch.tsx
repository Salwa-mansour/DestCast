import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import '../css/search.css';

export function NavbarSearch({ hideMobileNav }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isDesktop = window.matchMedia('(min-width: 867px)').matches;

  const toggleSearch = () => {
    setIsOpen((prev) => !prev);
  };

  // useGSAP automatically scopes selectors and handles cleanup on unmount
  useGSAP(() => {
    if (!formRef.current) return;

    if (isDesktop) {
      if (isOpen) {
        formRef.current.style.display = 'block';
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: -5, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: 'power2.out',
            // Clears transform inline styles after entrance finishes keeping DOM clean
            clearProps: 'transform', 
          }
        );
      } else {
        gsap.to(formRef.current, {
          opacity: 0,
          y: -5,
          scale: 0.98,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            if (formRef.current) {
              formRef.current.style.display = 'none';
              // Completely wipe GSAP inline styles once hidden
              gsap.set(formRef.current, { clearProps: 'all' });
            }
          },
        });
      }
    } else {
      formRef.current.style.display = isOpen ? 'block' : 'none';
    }
  }, { scope: containerRef, dependencies: [isOpen] });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    hideMobileNav?.();
    if (query.trim()) {
      navigate(`/posts?search=${encodeURIComponent(query)}`);
      if (isDesktop) setIsOpen(false);
    }
  };

  return (
    <div className='nav-search-container' ref={containerRef}>
      <button 
        className='form-toggler' 
        title='search blog posts'
        onClick={toggleSearch}
        type="button"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>

      <form 
        ref={formRef} 
        onSubmit={handleSearch} 
        className="nav-search-form"
      
      >
        <div className='input-group'>
          <input
            type="text"
            name='search'
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type='submit'>search</button>
        </div>
      </form>
    </div>
  );
}