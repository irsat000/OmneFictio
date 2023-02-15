using AutoMapper;
using OmneFictio.WebApi.Entities;
using OmneFictio.WebApi.Dtos;

namespace OmneFictio.WebApi.Configurations;

public class MapperConfig : Profile{
    public MapperConfig(){
        CreateMap<AccountDtoRead_1, Account>().ReverseMap();
        CreateMap<AccountDtoRead_2, Account>().ReverseMap();
        CreateMap<AccountDtoRead_3, Account>().ReverseMap();
        CreateMap<AccountDtoWrite_1, Account>().ReverseMap();

        CreateMap<PostDtoRead_1, Post>().ReverseMap();
        CreateMap<PostDtoRead_2, Post>().ReverseMap();

        CreateMap<ChapterDtoRead_1, Chapter>().ReverseMap();
        CreateMap<ChapterDtoRead_2, Chapter>().ReverseMap();

        CreateMap<CommentDtoRead_1, Comment>().ReverseMap();
        CreateMap<CommentDtoRead_2, Comment>().ReverseMap();
        
        CreateMap<ReplyDtoRead_1, Reply>().ReverseMap();
        CreateMap<ReplyDtoRead_2, Reply>().ReverseMap();

        CreateMap<RequestDto, Request>().ReverseMap();


        CreateMap<VoteDto, Vote>().ReverseMap();
        CreateMap<VoteDtoWrite_1, Vote>().ReverseMap();

        CreateMap<TagDto, Tag>().ReverseMap();
        CreateMap<TagDtoWrite_1, Tag>().ReverseMap();

        CreateMap<PreferenceDto, Preference>().ReverseMap();
        CreateMap<AccountIPDto, AccountIP>().ReverseMap();
        CreateMap<AccountThemeSelectionsDto, AccountThemeSelections_MM>().ReverseMap();
        CreateMap<ChatMessageDto, ChatMessage>().ReverseMap();
        CreateMap<AuthorityDto, Authority>().ReverseMap();
        CreateMap<FollowedUserDto, FollowedUser>().ReverseMap();
        CreateMap<SavedPostDto, SavedPost>().ReverseMap();

        CreateMap<RateDto, Rate>().ReverseMap();
        CreateMap<PostGiftDto, PostGift>().ReverseMap();
        CreateMap<RatedAsDto, RatedA>().ReverseMap();
        CreateMap<DeletedStatusDto, DeletedStatus>().ReverseMap();
        CreateMap<PostStatusDto, PostStatus>().ReverseMap();
        CreateMap<PostTypeDto, PostType>().ReverseMap();

        CreateMap<ThemeDto, Theme>().ReverseMap();
        CreateMap<InventoryItemDto, InventoryItem>().ReverseMap();
        CreateMap<LanguageDto, Language>().ReverseMap();
        CreateMap<ExistingStoryDto, ExistingStory>().ReverseMap();
        CreateMap<ExistingStoryTypeDto, ExistingStoryType>().ReverseMap();

        
    }
}