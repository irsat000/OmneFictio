using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Dtos;

public class LanguageDto
{
    public string? LanCode { get; set; }
    public string Body { get; set; } = null!;
}