using AutoMapper;
using OmneFictio.MinApi.Models;
using OmneFictio.MinApi.Dtos;

namespace OmneFictio.MinApi.Configurations;

public class MapperConfig : Profile{
    public MapperConfig(){
        CreateMap<AccountDtoRead_1, Account>().ReverseMap();
        CreateMap<AccountDtoRead_2, Account>().ReverseMap();
        CreateMap<AccountDtoRead_3, Account>().ReverseMap();
        CreateMap<AccountDtoRead_4, Account>().ReverseMap();
        CreateMap<AccountDtoWrite_1, Account>().ReverseMap();

        CreateMap<PostDtoRead_1, Post>().ReverseMap();
        CreateMap<PostDtoRead_2, Post>().ReverseMap();
        CreateMap<PostDtoWrite_1, Post>().ReverseMap();

        CreateMap<ChapterDtoRead_1, Chapter>().ReverseMap();

        CreateMap<CommentDtoRead_1, Comment>().ReverseMap();
        CreateMap<CommentDtoRead_2, Comment>().ReverseMap();

        CreateMap<ReplyDtoRead_1, Reply>().ReverseMap();
        CreateMap<ReplyDtoRead_2, Reply>().ReverseMap();

        CreateMap<VoteDtoWrite_1, Vote>().ReverseMap();
        CreateMap<VoteDtoRead_2, Vote>().ReverseMap();
        
        CreateMap<TagDtoWrite_1, Tag>().ReverseMap();
        

        CreateMap<AuthorityDto, Authority>().ReverseMap();
        CreateMap<DeletedStatusDto, DeletedStatus>().ReverseMap();
        CreateMap<ExistingStoryDto, ExistingStory>().ReverseMap();
        CreateMap<ExistingStoryTypeDto, ExistingStoryType>().ReverseMap();
        CreateMap<InventoryItemDto, InventoryItem>().ReverseMap();
        CreateMap<IpDto, Ip>().ReverseMap();
        CreateMap<LanguageDto, Language>().ReverseMap();
        CreateMap<PostGiftDto, PostGift>().ReverseMap();
        CreateMap<PostStatusDto, PostStatus>().ReverseMap();
        CreateMap<PostTypeDto, PostType>().ReverseMap();
        CreateMap<RatedAsDto, RatedA>().ReverseMap();
        CreateMap<RateDto, Rate>().ReverseMap();
        CreateMap<TagDto, Tag>().ReverseMap();
        CreateMap<VoteDto, Vote>().ReverseMap();
    }
}