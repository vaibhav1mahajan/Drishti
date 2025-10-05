import os
import streamlit as st
from dotenv import load_dotenv
load_dotenv()

st.set_page_config(page_title="DRISHTI", layout="wide")

# Center content
st.markdown("""
    <style>
    .centered {
        display: flex; height: 75vh; align-items: center; justify-content: center;
        font-size: 36px; font-weight: 700;
    }
    </style>
""", unsafe_allow_html=True)

st.markdown('<div class="centered">Hello from DRISHTI 👋</div>', unsafe_allow_html=True)
