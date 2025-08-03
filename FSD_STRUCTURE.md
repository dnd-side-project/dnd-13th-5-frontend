# FSD (Feature-Sliced Design) Project Structure

이 프로젝트는 FSD 아키텍처를 따릅니다.

## 폴더 구조

```
src/
├── app/                    # 애플리케이션 진입점과 전역 설정
│   ├── providers/         # 전역 프로바이더들 (Router, QueryClient 등)
│   ├── styles/           # 전역 스타일
│   └── App.tsx           # 메인 앱 컴포넌트
├── pages/                # 페이지/라우트 단위
│   ├── home/            # 홈 페이지
│   └── dashboard/       # 대시보드 페이지
├── widgets/             # 독립적인 UI 블록
├── features/            # 비즈니스 기능
├── entities/            # 비즈니스 엔티티
└── shared/              # 공유 리소스
    ├── ui/             # 재사용 가능한 UI 컴포넌트
    ├── lib/            # 유틸리티 함수, 훅
    ├── api/            # API 관련 로직
    ├── config/         # 설정 및 상수
    ├── types/          # 타입 정의
    ├── assets/         # 정적 리소스
    └── store/          # 전역 상태 관리
```

## FSD 계층 구조

1. **app** - 애플리케이션 초기화 (providers, routing, global styles)
2. **pages** - 애플리케이션 페이지, 라우팅과 연결
3. **widgets** - 독립적인 UI 블록들의 조합
4. **features** - 사용자 시나리오, 비즈니스 기능
5. **entities** - 비즈니스 엔티티 (user, product 등)
6. **shared** - 재사용 가능한 코드 (UI kit, utils, config)

## 의존성 규칙

- 상위 계층은 하위 계층만 import 할 수 있습니다
- 같은 계층끼리는 import 하지 않습니다
- `shared`는 모든 계층에서 사용 가능합니다

## 사용법

각 계층의 모듈은 public API를 통해 export하며, `index.ts` 파일을 통해 관리됩니다.
