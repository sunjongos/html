---
name: HTML Generator Skill
description: 즉석 1회용 커스텀 웹 도구(HTML) 생성 스킬입니다. 프롬프트 기반으로 대시보드, 툴, 프로토타입 등을 3단 분리하여 최고급 UI로 자동 생성합니다.
---

# 🌐 HTML Generator Skill

## 📌 스킬 개요 (Overview)
`HTML Generator Skill`은 에이전트가 사용자(대표님)의 요구사항에 맞춰 **즉석에서 1회용 커스텀 웹 도구 및 UI를 생성**할 때 사용하는 핵심 지침서입니다.
단순한 텍스트 답변을 넘어, 브라우저에서 직접 조작(Interactive)하고 결과값을 클립보드에 복사(Loop)하여 다시 AI에게 전달할 수 있는 '살아있는 도구'를 만듭니다.

---

## 🧠 작동 파이프라인 (Action Flow)

HTML 생성 요청을 받으면 다음 3단계를 수행하십시오.

### Phase 1. Parse (요구사항 구조화)
프롬프트에서 다음 사항을 완벽히 추출하십시오.
- **도구 성격**: 대시보드인가? 파라미터 튜너인가? 데이터(칸반) 분류기인가?
- **핵심 I/O**: 사용자가 무엇을 조작하고(슬라이더, 드래그), 어떤 결과(그래프, 텍스트)를 얻고자 하는가?

### Phase 2. Generate & Split (3단 분리 및 생성)
하나의 파일에 모든 것을 욱여넣지 마십시오. `--split` 옵션 또는 명시적 요구가 있을 시 3단으로 엄격히 분리하여 렌더링하십시오.
1. **`index.html`**: 시맨틱 태그 구조 및 외부 CSS/JS 로드.
2. **`style.css`**: 최고급 모던 UI (Grid/Flexbox, Glassmorphism, Micro-animations).
3. **`script.js`**: DOM 조작, 상태 관리, 'Copy as Markdown/JSON' 등의 복사 기능.

### Phase 3. Deploy (역결합 루프 준비)
- 생성된 파일을 지정된 워크스페이스에 저장하고, 브라우저에서 확인할 수 있는 경로를 안내하십시오.
- **반드시 "조작 후 결과값을 복사하여 다시 알려주세요"라는 멘트로 다음 워크플로우(역결합 Loop)를 유도하십시오.**

---

## 🎨 5대 핵심 활용 템플릿 (Templates)

상황에 맞게 아래의 템플릿 로직을 적용하십시오.

1. **Dashboard (`--type dashboard`)**: 옵션들의 장단점(Trade-off)을 나열하는 시각적 카드 UI 및 그리드 레이아웃.
2. **Report (`--type report`)**: 코드 분석, PR 리뷰 등을 위한 위험도(Risk) 색상 매핑 및 상세 주석 토글 뷰.
3. **Prototype (`--type prototype`)**: 애니메이션이나 크기 등을 조절하고 실시간 Preview를 보며, 최종 값을 복사하는 튜너(Tuner).
4. **Visual Document (`--type report`)**: SVG 다이어그램이 포함된 교육용/설명용 인터랙티브 문서.
5. **Data Tool (`--type tool`) 🌟**: 드래그 앤 드롭(Drag & Drop)으로 데이터를 분류하고(예: Now, Next, Later), 정리가 끝나면 마크다운으로 결과가 복사되는 1회용 에디터.

---

## ⚠️ 절대 준수 사항 (Constraints)

1. **Premium Aesthetics**: 브라우저 디폴트 UI는 절대 허용되지 않습니다. TailwindCSS(허가 시)나 모던 바닐라 CSS를 사용하여 사용자가 감탄(WOW-factor)할 수준의 디자인을 뽑아내십시오.
2. **Medical/NDB Theme**: 남양주백병원 관련 작업 시, 신뢰감을 주는 블루/화이트 톤과 정갈한 폰트(Pretendard 등)를 차용하십시오.
3. **Actionable Button**: 1회용 도구의 끝은 항상 **'Copy Result (복사하기)'** 버튼입니다. 조작 결과를 텍스트(마크다운/JSON)로 내보내는 기능을 반드시 구현하십시오.
