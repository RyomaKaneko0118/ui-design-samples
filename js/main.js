// メインのJavaScriptファイル
document.addEventListener('DOMContentLoaded', () => {
  // 現在のページのパスを取得
  const currentPath = window.location.pathname
  
  // 各ページに応じた初期化関数を呼び出す
  if (currentPath.includes('step-form.html')) {
    initStepForm()
  } else if (currentPath.includes('modal-overlay.html')) {
    initModalOverlay()
  } else if (currentPath.includes('empty-state.html')) {
    initEmptyState()
  } else if (currentPath.includes('carousel.html')) {
    initCarousel()
  } else if (currentPath.includes('scroll-hint.html')) {
    initScrollHint()
  } else if (currentPath.includes('tabs.html')) {
    initTabs()
  } else if (currentPath.includes('links-buttons.html')) {
    // 特に初期化は不要
  } else if (currentPath.includes('validation.html')) {
    initValidation()
  } else if (currentPath.includes('input-controls.html')) {
    initInputControls()
  }
})

// ステップフォーム
function initStepForm() {
  const steps = document.querySelectorAll('.step-form__step')
  const formPanels = document.querySelectorAll('.step-form__panel')
  const prevBtn = document.querySelector('.step-form__prev')
  const nextBtn = document.querySelector('.step-form__next')
  const submitBtn = document.querySelector('.step-form__submit')
  
  let currentStep = 0
  
  // 初期表示
  updateStepForm()
  
  // 「次へ」ボタンのイベント
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        currentStep++
        updateStepForm()
      }
    })
  }
  
  // 「戻る」ボタンのイベント
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--
        updateStepForm()
      }
    })
  }
  
  // 送信ボタンのイベント
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault()
      alert('フォームが送信されました！')
    })
  }
  
  // ステップフォームの表示を更新
  function updateStepForm() {
    // ステップの表示更新
    steps.forEach((step, index) => {
      step.classList.remove('active', 'completed')
      
      if (index === currentStep) {
        step.classList.add('active')
      } else if (index < currentStep) {
        step.classList.add('completed')
      }
    })
    
    // フォームパネルの表示更新
    formPanels.forEach((panel, index) => {
      panel.style.display = index === currentStep ? 'block' : 'none'
    })
    
    // ボタンの表示更新
    if (prevBtn) {
      prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-block'
    }
    
    if (nextBtn) {
      nextBtn.style.display = currentStep === steps.length - 1 ? 'none' : 'inline-block'
    }
    
    if (submitBtn) {
      submitBtn.style.display = currentStep === steps.length - 1 ? 'inline-block' : 'none'
    }
  }
}

// モーダルオーバーレイ
function initModalOverlay() {
  const openModalBtns = document.querySelectorAll('.open-modal')
  const closeModalBtns = document.querySelectorAll('.modal__close, .modal__cancel')
  const modals = document.querySelectorAll('.modal')
  
  // モーダルを開く
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal')
      const modal = document.getElementById(modalId)
      
      if (modal) {
        modal.classList.add('active')
      }
    })
  })
  
  // モーダルを閉じる
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal')
      
      if (modal) {
        modal.classList.remove('active')
      }
    })
  })
  
  // モーダル外をクリックして閉じる
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active')
      }
    })
  })
}

// エンプティステート
function initEmptyState() {
  const addItemBtn = document.querySelector('.empty-state__button')
  const emptyState = document.querySelector('.empty-state')
  const contentList = document.querySelector('.content-list')
  
  if (addItemBtn && emptyState && contentList) {
    addItemBtn.addEventListener('click', () => {
      // エンプティステートを非表示
      emptyState.style.display = 'none'
      
      // コンテンツを表示
      contentList.style.display = 'block'
      
      // サンプルアイテムを追加
      for (let i = 1; i <= 3; i++) {
        const item = document.createElement('div')
        item.className = 'content-list__item'
        item.innerHTML = `
          <h3>アイテム ${i}</h3>
          <p>これはサンプルアイテムです。実際のアプリケーションでは、ユーザーが追加したコンテンツがここに表示されます。</p>
        `
        contentList.appendChild(item)
      }
    })
  }
}

// カルーセル
function initCarousel() {
  const track = document.querySelector('.carousel__track')
  const slides = document.querySelectorAll('.carousel__slide')
  const dotsContainer = document.querySelector('.carousel__nav')
  const prevButton = document.querySelector('.carousel__button--prev')
  const nextButton = document.querySelector('.carousel__button--next')
  
  if (!track || slides.length === 0) return
  
  let currentIndex = 0
  const slideWidth = slides[0].getBoundingClientRect().width
  
  // 初期化
  updateCarousel()
  
  // ドットナビゲーションを作成
  if (dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement('div')
      dot.className = 'carousel__dot'
      dot.addEventListener('click', () => {
        currentIndex = index
        updateCarousel()
      })
      dotsContainer.appendChild(dot)
    })
  }
  
  // 前へボタン
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length
      updateCarousel()
    })
  }
  
  // 次へボタン
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length
      updateCarousel()
    })
  }
  
  // カルーセルの表示を更新
  function updateCarousel() {
    // スライドの位置を更新
    if (track) {
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`
    }
    
    // ドットの状態を更新
    const dots = document.querySelectorAll('.carousel__dot')
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex)
    })
  }
}

// スクロールヒント
function initScrollHint() {
  const scrollContainer = document.querySelector('.scroll-hint')
  const scrollIndicator = document.querySelector('.scroll-hint__indicator')
  
  if (scrollContainer && scrollIndicator) {
    // スクロールイベント
    scrollContainer.addEventListener('scroll', () => {
      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight
      
      // スクロールが最下部に近づいたらインジケーターを非表示
      if (scrollContainer.scrollTop > maxScroll - 50) {
        scrollIndicator.style.opacity = '0'
      } else {
        scrollIndicator.style.opacity = '1'
      }
    })
  }
}

// タブ
function initTabs() {
  const tabLinks = document.querySelectorAll('.tabs__link')
  const tabPanes = document.querySelectorAll('.tabs__pane')
  
  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      const tabId = link.getAttribute('data-tab')
      
      // アクティブなタブリンクを更新
      tabLinks.forEach(item => item.classList.remove('active'))
      link.classList.add('active')
      
      // アクティブなタブペインを更新
      tabPanes.forEach(pane => {
        pane.classList.toggle('active', pane.id === tabId)
      })
    })
  })
}

// バリデーション
function initValidation() {
  const passwordInput = document.querySelector('#password')
  const requirements = {
    length: document.querySelector('[data-requirement="length"]'),
    uppercase: document.querySelector('[data-requirement="uppercase"]'),
    lowercase: document.querySelector('[data-requirement="lowercase"]'),
    number: document.querySelector('[data-requirement="number"]'),
    special: document.querySelector('[data-requirement="special"]')
  }
  
  if (passwordInput) {
    passwordInput.addEventListener('input', validatePassword)
    
    function validatePassword() {
      const value = passwordInput.value
      
      // 8文字以上
      const hasLength = value.length >= 8
      updateRequirement(requirements.length, hasLength)
      
      // 大文字を含む
      const hasUppercase = /[A-Z]/.test(value)
      updateRequirement(requirements.uppercase, hasUppercase)
      
      // 小文字を含む
      const hasLowercase = /[a-z]/.test(value)
      updateRequirement(requirements.lowercase, hasLowercase)
      
      // 数字を含む
      const hasNumber = /[0-9]/.test(value)
      updateRequirement(requirements.number, hasNumber)
      
      // 特殊文字を含む
      const hasSpecial = /[^A-Za-z0-9]/.test(value)
      updateRequirement(requirements.special, hasSpecial)
    }
    
    function updateRequirement(element, isValid) {
      if (!element) return
      
      element.classList.toggle('valid', isValid)
      
      const icon = element.querySelector('svg')
      if (icon) {
        icon.innerHTML = isValid
          ? '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>'
          : '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>'
      }
    }
  }
}

// 入力コントロール
function initInputControls() {
  // ステッパー
  const stepperMinusButtons = document.querySelectorAll('.stepper-minus')
  const stepperPlusButtons = document.querySelectorAll('.stepper-plus')
  const stepperInputs = document.querySelectorAll('.input-controls__stepper-input')
  
  stepperMinusButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.nextElementSibling
      if (input && input.value > 0) {
        input.value = parseInt(input.value) - 1
      }
    })
  })
  
  stepperPlusButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.previousElementSibling
      if (input) {
        input.value = parseInt(input.value) + 1
      }
    })
  })
  
  stepperInputs.forEach(input => {
    input.addEventListener('input', () => {
      // 数値以外の入力を削除
      input.value = input.value.replace(/[^0-9]/g, '')
      
      // 空の場合は0に設定
      if (input.value === '') {
        input.value = '0'
      }
    })
  })
  
  // スライダー
  const sliders = document.querySelectorAll('.input-controls__slider')
  const sliderValues = document.querySelectorAll('.slider-value')
  
  sliders.forEach((slider, index) => {
    slider.addEventListener('input', () => {
      if (sliderValues[index]) {
        sliderValues[index].textContent = slider.value
      }
    })
  })
}
