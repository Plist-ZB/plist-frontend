import React, { useState } from "react";
import TopBarLayout from "@/layout/TopBarLayout";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface SubscribedUser {
  id: number;
  name: string;
  color: string;
  isSubscribed: boolean;
}

const mockData: SubscribedUser[] = [
  { id: 1, name: "노지훈", color: "#3366FF", isSubscribed: true },
  { id: 2, name: "이은선", color: "#CC33FF", isSubscribed: true },
  { id: 3, name: "윤학수", color: "#557A00", isSubscribed: true },
];

export default function FollowIngListPage() {
  const [subscribedUsers, setSubscribedUsers] = useState<SubscribedUser[]>(mockData);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleUserClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  const handleSubscribeClick = (userId: number) => {
    const user = subscribedUsers.find((u) => u.id === userId);
    if (!user) return;

    if (user.isSubscribed) {
      setSelectedUserId(userId);
      setShowConfirmModal(true);
    } else {
      updateSubscription(userId, true);
    }
  };

  const updateSubscription = (userId: number, subscribed: boolean) => {
    const updatedList = subscribedUsers.map((user) =>
      user.id === userId ? { ...user, isSubscribed: subscribed } : user
    );
    setSubscribedUsers(updatedList);
  };

  const confirmUnsubscribe = () => {
    if (selectedUserId !== null) {
      updateSubscription(selectedUserId, false);
      setSelectedUserId(null);
      setShowConfirmModal(false);
    }
  };

  return (
    <TopBarLayout
      topBarProps={{
        title: "내가 구독한 구독자",
        backURL: "/mypage",
        hasAction: true,
      }}
    >
      <List>
        {subscribedUsers.map((user) => (
          <UserItem key={user.id}>
            <ColorDot
              style={{ backgroundColor: user.color }}
              onClick={() => handleUserClick(user.id)}
            />
            <UserName onClick={() => handleUserClick(user.id)}>{user.name}</UserName>
            <SubscribeButton
              onClick={() => handleSubscribeClick(user.id)}
              isSubscribed={user.isSubscribed}
            >
              {user.isSubscribed ? "구독중" : "구독하기"}
            </SubscribeButton>
          </UserItem>
        ))}
      </List>

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
  );
}

const List = styled.div``;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

const ColorDot = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 20px;
  cursor: pointer;
`;

const UserName = styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SubscribeButton = styled.button<{ isSubscribed: boolean }>`
  padding: 6px 12px;
  margin-right: 20px;
  background: ${({ isSubscribed }) => (isSubscribed ? "#4854a2" : "#ffffff")};
  color: ${({ isSubscribed }) => (isSubscribed ? "#ffffff" : "#4854a2")};
  border: 1px solid #4854a2;
  border-radius: 8px;
  cursor: pointer;
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
