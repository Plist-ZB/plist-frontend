import { useState } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { instance } from "@/services/api/instance";
import { useNavigate } from "react-router-dom";

// 검색 결과 타입 정의
interface SearchResult {
  channelId: number;
  channelName: string;
  channelCategoryName: string;
  channelThumbnail: string;
  channelStreamingTime: string;
  channelCreatedAt: string;
  channelStatus: string;
  channelHostName: string;
  channelParticipantCount: number;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어
  const [results, setResults] = useState<SearchResult[] | null>(null); // 검색 결과
  const [, setLoading] = useState<boolean>(false); // 로딩 상태
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  const handleUserClick = (userId: string | number) => {
    navigate(`/user/${userId}`);
  };

  const handleSubscribeClick = () => {
    if (isSubscribed) {
      setShowConfirmModal(true);
    } else {
      setIsSubscribed(true);
    }
  };

  const confirmUnsubscribe = () => {
    setIsSubscribed(false);
    setShowConfirmModal(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // 입력값이 공백이거나 비어 있을 경우 API 호출 X

    setLoading(true);
    try {
      // API 호출
      const response = await instance.get<SearchResult[]>(`/channels/search`, {
        params: {
          searchValue: searchQuery, // 검색어로 검색
        },
      });

      setResults(response.data); // 검색 결과 상태에 저장
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      setResults([]); // 검색 실패 시 빈 배열로 처리
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(); // Enter 키로 검색 실행
    }
  };

  return (
    <Container>
      <SearchBarContainer>
        <SearchInput
          placeholder="닉네임을 검색해주세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Enter 키 이벤트 핸들러 추가
        />
        <SearchIcon onClick={handleSearch}>
          <IoIosSearch size={20} color="#888787" />
        </SearchIcon>
      </SearchBarContainer>

      <Line />

      {results?.map((result) => (
        <ChannelCard key={result.channelId}>
          <AvatarWrapper>
            <AvatarImage
              src={result.channelThumbnail}
              onClick={() => handleUserClick(result.channelId)}
              style={{ cursor: "pointer" }}
            />
            {result.channelStatus === "ON_AIR" && <LiveBadge>Live</LiveBadge>}
          </AvatarWrapper>

          <ChannelInfo>
            <ChannelName
              onClick={() => handleUserClick(result.channelId)}
              style={{ cursor: "pointer" }}
            >
              {result.channelHostName}
            </ChannelName>
            <SubscriberText>구독자 {result.channelParticipantCount}명</SubscriberText>
          </ChannelInfo>

          <SubscribeButton onClick={handleSubscribeClick} isSubscribed={isSubscribed}>
            {isSubscribed ? "구독중" : "구독하기"}
          </SubscribeButton>
          {/* 구독 상태는 상태값에 따라 조건부로 처리 가능 */}
        </ChannelCard>
      ))}

      {showConfirmModal && (
        <Modal>
          <ModalText>구독을 취소하시겠습니까?</ModalText>
          <ModalButtons>
            <button onClick={() => setShowConfirmModal(false)}>취소</button>
            <button onClick={confirmUnsubscribe}>구독 취소</button>
          </ModalButtons>
        </Modal>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  gap: 24px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
`;

const SearchIcon = styled.div`
  cursor: pointer; // 마우스 커서를 포인터로 변경
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 4px;
`;

const ChannelCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
`;

const AvatarWrapper = styled.div`
  position: relative;
  margin-right: 12px;
`;

const AvatarImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #ddd;
  object-fit: cover;
  margin-left: 20px;
`;

const LiveBadge = styled.span`
  position: absolute;
  bottom: -5px;
  left: 0;
  background-color: red;
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 4px;
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ChannelName = styled.p`
  font-weight: 600;
  color: #333;
`;

const SubscriberText = styled.p`
  font-size: 14px;
  color: #666;
`;

const SubscribeButton = styled.button<{ $isSubscribed: boolean }>`
  margin-right: 20px;
  padding: 6px 12px;
  background: ${({ $isSubscribed }) => ($isSubscribed ? "#4854a2" : "#ffffff")};
  color: ${({ $isSubscribed }) => ($isSubscribed ? "#ffffff" : "#4854a2")};
  border: 1px solid #4854a2;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    color: #ffffff;
    background-color: #6981c8;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 24px;
  z-index: 100;
`;

const ModalText = styled.div`
  margin-bottom: 16px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
  }
`;
