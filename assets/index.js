import { Collapse, Dropdown } from 'bootstrap'
import BigPicture from 'bigpicture'

let $ = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)

let vars = {
  "xs": "0",
  "sm": "576px",
  "md": "768px",
  "lg": "1025px",
  "xl": "1200px",
  "mbp": "2560px",
  "xxl": "5120px",
}
let mediaDown = (breakpoint) => {
  return window.matchMedia("(max-width:" + vars[breakpoint] + ")").matches
}

window.addEventListener('DOMContentLoaded', () => {
  /**
   * 상단 메뉴
   */
  let navbar = $('.navbar.fixed-top')
  if (!mediaDown('lg')) {
    // 부모, 자식 메뉴 컬럼 시작 위치 맞추기.
    let marginsRight = ['0px', '-29.9062px', '-55.5469px']
    navbar.querySelectorAll('.nav-item').forEach((node, i) => {
      let children = $$('.menu-item--children')
      children[i].style.marginRight = marginsRight[i]
    })
    // 마우스 들어오고 나갈 때 토글.
    navbar.addEventListener('mouseenter', (e) => {
      $('.menu-children').classList.remove('invisible')
    }, false)
    navbar.addEventListener('mouseleave', (e) => {
      $('.menu-children').classList.add('invisible')
    }, false)
  }

  // 외부 링크는 새창으로
  let internal = location.host.replace("www.", "");
      internal = new RegExp(internal, "i");
  let a = document.getElementsByTagName('a');
  for (let i = 0; i < a.length; i++) {
    let href = a[i].host;
    if( !internal.test(href) ) {
      a[i].setAttribute('target', '_blank');
    }
  }

  /**
   * Bicpicture
   */
  let bigPictures = $$('.image-gallery img:not(.no-bp)')
  if (!mediaDown('lg') && bigPictures) {
    // bigPicture 용도로 이미지 마크업 수정
    bigPictures.forEach((image, index) => {
      // 전체화면용 이미지 파일을 제공합니다.
      let fullImage = image.src.replace('.jpg', '-full.jpg').replace('.png', '-full.png')
      image.setAttribute('data-bp', fullImage)
      // 프로젝트 상세 화면 이미지 클릭 시 bigPicture 띄우기.
      image.addEventListener('click', e => {
        e.preventDefault();
        BigPicture({
          el: e.target,
          gallery: '.image-gallery',
          loop: true,
          animationStart: () => {
            $('#bp_container .bp-x').innerHTML = '×'
            $$('#bp_container .bp-lr').forEach(button => { button.innerHTML = '〈'})
          }
        })
        // Make available globally
        window.BigPicture = BigPicture
      })
    })
  }

  /**
   * Public Program - 콘텐츠 영역 첫번째 이미지 높이와 동일하게
   */
  let publicProgram = $('.page--program--public-program')
  if (!mediaDown('lg') && publicProgram) {
    let height = $('.bg-images img').clientHeight
    if (height === 0) {
      $('.block--content').style.height = 'auto'
    }
    else {
      $('.block--content').style.height = height + 'px'
    }
    
  }

})
