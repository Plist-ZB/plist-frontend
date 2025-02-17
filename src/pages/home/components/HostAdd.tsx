import { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { instance } from "@/services/api/instance";

interface HostAddProps {
  isOpen: boolean;
  onClose: () => void;
}

// API 요청 함수 정의
const createChannel = async (channelData: {
  channelName: string;
  categoryId: number;
  userPlaylistId?: number;
}) => {
  const { data } = await instance.post("/channel", channelData);
  return data;
};

// 카테고리 정보를 가져오는 API 함수
// eslint-disable-next-line no-empty-pattern
const fetchCategories = async ({}: { queryKey: [string, number] }) => {
  const { data } = await instance.get(`/categories`);
  console.log(data);
  return data;
};

// 내 재생목록 정보 가져오기
const fetchPlaylists = async () => {
  const { data } = await instance.get("/user/playlists");
  return data;
};

const CategoryPlaceholder = "카테고리";
const PlaylistPlaceholder = "재생목록";

export default function HostAdd({ isOpen, onClose }: HostAddProps) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [channelTitle, setChannelTitle] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0); // categoryId는 숫자
  const [, setThumbnail] = useState<string>("");

  // 카테고리 데이터와 재생목록 데이터 로딩
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["/channels/category", categoryId], // categoryId에 따라 API를 호출
    queryFn: fetchCategories,
  });
  console.log(categories);

  const { data: playlists, isLoading: playlistsLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });

  interface Playlist {
    userPlaylistId: number;
    userPlaylistName: string;
    userPlaylistThumbnail: string;
    videoCount: number;
  }

  const handlePlaylistChange = (
    newValue: { value: number; label: string; thumbnail: string } | null
  ) => {
    const selectedOption = newValue as { value: number; label: string; thumbnail: string };
    setSelectedPlaylist({
      userPlaylistId: selectedOption.value,
      userPlaylistName: selectedOption.label,
      userPlaylistThumbnail: selectedOption.thumbnail,
      videoCount: 0, // videoCount는 선택할 필요 없으므로 임시값 설정
    });
    setThumbnail(selectedOption.thumbnail); // 썸네일 업데이트
  };

  const [selectedCategory, setSelectedCategory] = useState<{ value: string; label: string } | null>(
    null
  );

  const handleCategoryChange = (newValue: unknown) => {
    const selectedOption = newValue as { value: string; label: string } | null;
    if (!selectedOption || selectedOption.value === selectedCategory?.value) {
      return; // 이미 같은 값이 선택되어 있으면 무시
    }

    // 상태 업데이트를 한 번만 호출하여 불필요한 렌더링 방지
    setSelectedCategory(selectedOption);
    setCategoryId(Number(selectedOption.value));
  };

  const { mutate: createChannelMutation, status: createChannelStatus } = useMutation({
    mutationFn: createChannel,
    onSuccess: (data) => {
      onClose(); // 모달 닫기
      navigate(`/channel/${data.channelId}`, {
        state: data, // API에서 받은 데이터를 넘겨줌
      });
    },
    onError: (error) => {
      console.error("Error creating channel:", error);
    },
  });

  const handleSubmit = () => {
    const channelData = {
      channelName: channelTitle,
      categoryId,
      userPlaylistId: selectedPlaylist ? selectedPlaylist.userPlaylistId : undefined, // playlist가 있을 경우만 userPlaylistId 포함
    };
    createChannelMutation(channelData); // 채널 생성
  };

  // 카테고리와 재생목록 데이터 로딩 중일 경우 로딩 메시지
  if (categoriesLoading || playlistsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ModalOverlay style={{ display: isOpen ? "flex" : "none" }}>
      <ModalContainer>
        <ModalHeader>
          <h2>채널 생성하기</h2>
          <CloseButton>
            <IoClose onClick={onClose} size={25} />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <Label>채널 제목</Label>
          <Input
            type="text"
            placeholder="채널 제목을 입력해주세요."
            value={channelTitle}
            onChange={(e) => setChannelTitle(e.target.value)}
          />
          <Label>카테고리 선택하기</Label>
          <SmallLabel>* 카테고리 선택은 필수입니다.</SmallLabel>
          <StyledSelect
            options={categories?.map((category: { categoryId: number; categoryName: string }) => ({
              value: category.categoryId.toString(),
              label: category.categoryName,
            }))}
            classNamePrefix="react-select"
            placeholder={CategoryPlaceholder}
            value={selectedCategory} // 선택된 카테고리를 명시적으로 설정
            onChange={handleCategoryChange} // 변경된 핸들러 사용
            components={{ IndicatorSeparator: () => null }}
          />
          <Label>내 재생목록에서 가져오기</Label>
          <StyledSelect
            options={playlists?.map((playlist: Playlist) => ({
              value: playlist.userPlaylistId, // id는 userPlaylistId로 변경
              label: playlist.userPlaylistName, // 이름은 userPlaylistName으로 설정
              thumbnail: playlist.userPlaylistThumbnail, // 썸네일은 userPlaylistThumbnail로 설정
            }))}
            classNamePrefix="react-select"
            placeholder={PlaylistPlaceholder}
            onChange={(newValue) =>
              handlePlaylistChange(
                newValue as { value: number; label: string; thumbnail: string } | null
              )
            } // 매개변수 추가
            components={{ IndicatorSeparator: () => null }}
          />
          {/* <Label>채널 최대 인원 수</Label>
          <RadioGroup>
            {["5명", "15명", "20명", "25명"].map((option) => (
              <RadioButton key={option}>
                <input type="radio" name="maxUsers" value={option} />
                <span>{option}</span>
              </RadioButton>
            ))}
          </RadioGroup> */}
          <Label>썸네일</Label>
          <SmallLabel>* 썸네일은 재생목록 첫번째 이미지로 자동 선택됩니다.</SmallLabel>
          <ThumbnailPreview>
            {selectedPlaylist ? (
              <img
                src={selectedPlaylist.userPlaylistThumbnail}
                alt="썸네일"
                className="thumbnail-img"
              />
            ) : (
              <span>썸네일 없음</span>
            )}
          </ThumbnailPreview>
        </ModalBody>
        <ModalFooter>
          <SubmitButton onClick={handleSubmit} disabled={createChannelStatus === "pending"}>
            {createChannelStatus === "pending" ? "생성 중..." : "생성"}
          </SubmitButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
}

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin-left: 10px;
  }
`;

const CloseButton = styled.div`
  background: none;
  cursor: pointer;
  padding: 10px 10px;

  &:hover {
    border: 1px solid var(--color-primary);
    border-radius: 8px;
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

const ModalBody = styled.div`
  padding: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  &:hover {
    border-color: var(--color-primary);
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
`;

const StyledSelect = styled(Select)`
  .react-select__control {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: none;
    margin-bottom: 20px;
    &:hover {
      border-color: var(--color-primary);
    }
  }

  .react-select__option {
    background-color: #fff;
    color: #666;
    &:hover {
      background-color: #e6e6e6;
      color: #000;
    }
  }

  .react-select__option--is-selected {
    background-color: #f0f0f0;
    color: #333;
  }
`;

const SmallLabel = styled.label`
  font-size: 10px;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
  color: var(--color-primary);
`;

// 최대 인원수 style
// const RadioGroup = styled.div`
//   display: flex;
//   gap: 8px;
//   margin-bottom: 12px;
// `;

// const RadioButton = styled.label`
//   display: flex;
//   align-items: center;
//   gap: 4px;

//   input {
//     margin: 0;
//   }

//   span {
//     font-size: 14px;
//   }
// `;

const ThumbnailPreview = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-primary-50);
  margin-bottom: 12px;

  span {
    font-size: 14px;
    color: #999;
  }

  .thumbnail-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const ModalFooter = styled.div`
  padding: 12px;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: var(--color-white);
  cursor: pointer;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;
