from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    api_v1_prefix: str
    supabase_url: str
    supabase_key: str

    class Config:
        env_file = ".env"

@lru_cache
def get_settings():
    return Settings()