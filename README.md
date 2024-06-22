## 프로젝트 구성

- lg-ws-admin
    - SPA WEB 관리자 사용자 vue project
 
## 프로젝트 실행

- npm install
- npm run serve

## 빌드 및 배포 방법


- npm run build (default 경로 /dist)
- 해당 build 파일 폴더 전체 FTP(파일 질라)를 통해 서버에 이동 (경로: /var/www/admin, 소스 덮어쓰기)
- 해당 서비스 실행 (명령어 : systemctl restart nginx ) - 실행 스크립트 사전 작성
- nginx 상태 확인 ( systemctl status nginx )

## 기타 

#### nignx 설정 파일 경로 (/etc/nginx/conf.d/default.conf)
#### 해당 프로젝트는 가상 호스트 (AWS, 가비아)
