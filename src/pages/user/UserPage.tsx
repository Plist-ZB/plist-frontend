import styled from "styled-components";
import TopBarLayout from "@/layout/TopBarLayout";

  return (
    <Container onScroll={handleScroll}>
      <TopBarLayout
        topBarProps={{
          title: "송유나님의 프로필", // Replace with actual data source
          backURL: "/mypage",
          hasAction: true,
        }}
      >
        <ProfileSection>
          <ProfileImage>
            <LiveBadge>Live</LiveBadge>
          </ProfileImage>
          <UserInfo>
            <Username>송유나</Username>
            <Subscribers>구독자 2,586명</Subscribers>
            <SubscribeButton onClick={handleSubscribeClick} isSubscribed={isSubscribed}>
              {isSubscribed ? "구독중" : "구독하기"}
            </SubscribeButton>
          </UserInfo>
        </ProfileSection>
        <StreamLine />
        <StreamTitle>
          <StreamName>송유나</StreamName>님의 과거 스트리밍
        </StreamTitle>
        <InfiniteScroll
          dataLength={streams.length}
          next={fetchNextPage}
          hasMore={hasNext}
          loader={<p className="p-1 text-center">호스트 이력을 가져오는 중입니다...</p>}
          endMessage={<p className="py-4 text-center">더 이상의 이력은 없습니다.</p>}
        >
          <section className="flex flex-col gap-2 p-4">
            {streams.map((item) => (
              <PastStreamCard key={item.channelId} item={item} />
            ))}
          </section>
        </InfiniteScroll>

        {showConfirmModal && (
          <Modal>
            <ModalText>구독을 취소하시겠습니까?</ModalText>
            <ModalButtons>
              <button onClick={() => setShowConfirmModal(false)}>취소</button>
              <button onClick={confirmUnsubscribe}>구독 취소</button>
            </ModalButtons>
          </Modal>
        )}
      </TopBarLayout>
    </Container>
  );
};

export default ProfilePage;

const Container = styled.div`
  height: 100vh;
  overflow-y: scroll;
  padding: 16px;
  background: white;
`;

const ProfileSection = styled.div`
  align-items: center;
  margin: 28px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ProfileImage = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: gray;
`;

const LiveBadge = styled.div`
  background: red;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 8px;
  width: 35px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Username = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 8px 0;
  display: flex;
  justify-content: center;
`;

const Subscribers = styled.div`
  font-size: 14px;
  color: gray;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
`;

const SubscribeButton = styled.button<{ isSubscribed: boolean }>`
  margin-top: 8px;
  padding: 6px 12px;
  background: ${({ isSubscribed }) => (isSubscribed ? "#869fd4" : "#ffffff")};
  color: ${({ isSubscribed }) => (isSubscribed ? "#ffffff" : "#4854a2")};
  border: 1px solid #4854a2;
  border-radius: 8px;
  cursor: pointer;
  justify-content: center;
`;

const StreamTitle = styled.h2`
  font-size: 18px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StreamName = styled.h2`
  color: #4854a2;
  font-weight: bold;
`;

const StreamLine = styled.h2`
  border-top: 1px solid #d9d9d9;
`;

const StreamCard = styled.div`
  display: flex;
  margin: 12px 0;
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  background: #ccc;
  margin-right: 12px;
`;

const StreamInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StreamTitleText = styled.div`
  font-weight: bold;
`;

const StreamMeta = styled.div`
  color: gray;
`;

const StreamDate = styled.div`
  color: gray;
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
