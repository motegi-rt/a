// Movie data from the provided JSON
const movieData = {
  featuredMovies: [
    {
      title: "ウィキッド ふたりの魔女",
      releaseDate: "2025年3月7日",
      director: "ジョン・M・チュウ",
      cast: "アリアナ・グランデ、シンシア・エリヴォ",
      rating: 4.8,
      image: "wicked.jpg",
      description: "ブロードウェイの名作ミュージカルの映画化。魔法の国オズを舞台に、緑の肌を持つ少女エルファバと人気者のグリンダの友情を描く感動作。"
    },
    {
      title: "ミッキー17",
      releaseDate: "2025年2月7日",
      director: "ポン・ジュノ",
      cast: "ロバート・パティンソン",
      rating: 4.5,
      image: "mickey17.jpg",
      description: "エドワード・アシュトンの同名小説を「パラサイト」のポン・ジュノ監督が映画化。人類が移住する惑星開拓に送り込まれる使い捨て労働者「ミッキー」の物語。"
    },
    {
      title: "キャプテン・アメリカ：ブレイブ・ニュー・ワールド",
      releaseDate: "2025年2月14日",
      director: "ジュリアス・オナー",
      cast: "アンソニー・マッキー",
      rating: 4.3,
      image: "captain_america.jpg",
      description: "MCUシリーズ新章。サム・ウィルソンが受け継いだキャプテン・アメリカとしての初の単独映画。新たな脅威との戦いを描く。"
    }
  ],
  genrePopularity: [
    { genre: "ミュージカル", percentage: 25 },
    { genre: "アクション", percentage: 20 },
    { genre: "SF", percentage: 18 },
    { genre: "ドラマ", percentage: 17 },
    { genre: "コメディ", percentage: 12 },
    { genre: "その他", percentage: 8 }
  ],
  latestReviews: [
    {
      title: "デューン 砂の惑星PART2",
      rating: 4.7,
      reviewer: "映画マニア",
      date: "2025年6月10日",
      excerpt: "壮大なスケールと緻密な世界観構築が見事。ヴィルヌーヴ監督の映像美は必見の価値あり。",
      image: "dune2.jpg"
    },
    {
      title: "インサイド・ヘッド2",
      rating: 4.9,
      reviewer: "アニメ評論家",
      date: "2025年6月5日",
      excerpt: "前作を超える感動と笑い。新たな感情キャラクターの登場で物語に深みが増した傑作。",
      image: "inside_out2.jpg"
    },
    {
      title: "ザ・バットマン2",
      rating: 4.4,
      reviewer: "DCファン",
      date: "2025年5月28日",
      excerpt: "マット・リーヴス監督が描くゴッサムの闇がさらに深まった。パティンソンの演技も冴えわたる。",
      image: "batman2.jpg"
    }
  ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeChart();
  initializeNavigation();
  initializeMovieCards();
  initializeNewsletterForm();
  initializeHeroButton();
});

// Initialize the genre popularity chart
function initializeChart() {
  const ctx = document.getElementById('genreChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: movieData.genrePopularity.map(item => item.genre),
      datasets: [{
        data: movieData.genrePopularity.map(item => item.percentage),
        backgroundColor: [
          '#1FB8CD',
          '#FFC185', 
          '#B4413C',
          '#ECEBD5',
          '#5D878F',
          '#DB4545'
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            font: {
              size: 14,
              family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
            },
            color: '#333333'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + '%';
            }
          },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#FFFFFF',
          bodyColor: '#FFFFFF',
          cornerRadius: 8
        }
      },
      layout: {
        padding: 20
      }
    }
  });
}

// Initialize smooth scrolling navigation
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize movie card interactions
function initializeMovieCards() {
  const movieCards = document.querySelectorAll('.movie-card');
  movieCards.forEach((card, index) => {
    card.addEventListener('click', function() {
      showMovieDetails(index);
    });
    
    // Add hover effects
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-5px)';
    });
  });
  
  // Initialize review cards
  const reviewCards = document.querySelectorAll('.review-card');
  reviewCards.forEach((card, index) => {
    card.addEventListener('click', function() {
      showReviewDetails(index);
    });
  });
}

// Show movie details (placeholder function)
function showMovieDetails(movieIndex) {
  const movie = movieData.featuredMovies[movieIndex];
  if (movie) {
    alert(`${movie.title}\n\n監督: ${movie.director}\n出演: ${movie.cast}\n評価: ${movie.rating}/5\n\n${movie.description}\n\n公開日: ${movie.releaseDate}`);
  }
}

// Show review details (placeholder function)
function showReviewDetails(reviewIndex) {
  const review = movieData.latestReviews[reviewIndex];
  if (review) {
    alert(`${review.title}\n評価: ${review.rating}/5\nレビュアー: ${review.reviewer}\n日付: ${review.date}\n\n${review.excerpt}`);
  }
}

// Initialize newsletter form
function initializeNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (email && isValidEmail(email)) {
      // Simulate form submission
      showNotification('ニュースレターの登録が完了しました！', 'success');
      emailInput.value = '';
    } else {
      showNotification('有効なメールアドレスを入力してください。', 'error');
    }
  });
}

// Initialize hero button
function initializeHeroButton() {
  const heroBtn = document.querySelector('.hero-btn');
  if (!heroBtn) return;
  
  heroBtn.addEventListener('click', function() {
    const reviewsSection = document.querySelector('#reviews');
    if (reviewsSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = reviewsSection.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
}

// Utility function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '500',
    zIndex: '1000',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
    maxWidth: '300px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  });
  
  // Set background color based on type
  if (type === 'success') {
    notification.style.backgroundColor = '#2A9D8F';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#DC2626';
  } else {
    notification.style.backgroundColor = '#A47864';
  }
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Add scroll-based animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe cards and sections
  const animatedElements = document.querySelectorAll('.movie-card, .review-card, .trends-content');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initializeScrollAnimations, 500);
});

// Add rating stars animation
function animateRatingStars() {
  const ratingElements = document.querySelectorAll('.rating-stars');
  ratingElements.forEach(rating => {
    rating.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.transition = 'transform 0.2s ease-out';
    });
    
    rating.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
}

// Initialize rating animations
document.addEventListener('DOMContentLoaded', animateRatingStars);