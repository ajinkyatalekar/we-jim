from typing import Optional
from pydantic import BaseModel

class ProfileUpdateSchema(BaseModel):
    display_name: Optional[str] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    gender: Optional[str] = None
    date_of_birth: Optional[str] = None

    class Config:
        extra = "forbid"