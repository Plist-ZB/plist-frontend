import styled from "styled-components";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/services/api/instance";

interface HostAddProps {
  isOpen: boolean;
  onClose: () => void;
}

// API 요청 함수 정의
const fetchCategories = async () => {
  const { data } = await instance.get("/categories"); // 실제 API 경로로 수정
  return data;
};

const fetchPlaylists = async () => {
  const { data } = await instance.get("/playlists"); // 실제 API 경로로 수정
  return data;
};

const CategoryPlaceholder = "카테고리";
const CategoryOptions = [
  { value: "bal", label: "발라드" },
  { value: "hip", label: "힙합" },
  { value: "ost", label: "OST" },
];

const PlaylistPlaceholder = "재생목록";
const PlaylistOptions = [
  { value: "재생목록", label: "없음" },
  { value: "재생목록", label: "데이식스 -  한페이지가 될 수 있게" },
  { value: "재생목록", label: "태연 - 그대라는 시" },
  { value: "재생목록", label: "아이유 - 관객이 될게게" },
];

export default function HostAdd({ isOpen, onClose }: HostAddProps) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  // useQuery 훅을 사용하여 데이터를 불러옴
  const { data: categories, isLoading: categoriesLoading } = useQuery(
    ["categories"],
    fetchCategories
  );

  const { data: playlists, isLoading: playlistsLoading } = useQuery(["playlists"], fetchPlaylists);

  const [selectedPlaylist, setSelectedPlaylist] = React.useState<any>(null);

  const handlePlaylistChange = (selectedOption: any) => {
    setSelectedPlaylist(selectedOption);
  };

  const handleSubmit = () => {
    onClose(); // 모달 닫기
    navigate("/channel/{id}"); // PlaylistPage로 이동
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
          <Input type="text" placeholder="채널 제목을 입력해주세요." />
          <Label>카테고리 선택하기</Label>
          <SmallLabel>* 카테고리 선택은 필수입니다.</SmallLabel>
          <StyledSelect
            options={categories?.map((category: any) => ({
              value: category.id,
              label: category.name,
            }))}
            classNamePrefix="react-select"
            placeholder={CategoryPlaceholder}
            components={{ IndicatorSeparator: () => null }}
          />
          <Label>내 재생목록에서 가져오기</Label>
          <StyledSelect
            options={playlists?.map((playlist: any) => ({
              value: playlist.id,
              label: playlist.title,
              thumbnail: playlist.thumbnail, // 썸네일 정보 추가
            }))}
            classNamePrefix="react-select"
            placeholder={PlaylistPlaceholder}
            onChange={handlePlaylistChange}
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
              <img src={selectedPlaylist.thumbnail} alt="썸네일" />
            ) : (
              <span>썸네일 없음</span>
            )}
          </ThumbnailPreview>
        </ModalBody>
        <ModalFooter>
          <SubmitButton onClick={handleSubmit}>생성</SubmitButton>
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

const CloseButton = styled.button`
  background: none;
  cursor: pointer;
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
  height: 150px;
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
