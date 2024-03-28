/* eslint-disable no-unused-vars */
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'


const style = {
  dataBox: {
    display: 'flex'
  }
}

const useStyles = makeStyles((theme) => ({
  list: {
    paddingLeft: 15,
    margin: 0,
    fontSize: '12px'
  },
  boxListData: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  boxMain: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    marginBottom: '15px'
  }
}))



const ListDataPegawai = ({
  index,
  imageSource,
  name,
  eselon,
  jabatan,
  golongan,
  nip,
  riwayatPendidikan,
  riwayatJabatan,
  pelatihanStruktural,
  pelatihanFungsional,
  pelatihanTeknis,
  riwayatCatatan
}) => {
  const classes = useStyles()

  return (
    <Box
      sx={{
        paddingX: 2
      }}
    >
      <Box
        className={classes.boxMain}
      >
        <Image
          src={imageSource}
          alt='Fhoto Pegawai'
          width={150}
          height={200}
        />
        <Typography>
          {name}
        </Typography>
      </Box>
      <Box
        className={classes.boxListData}
      >
        <Box
          sx={style.dataBox}
        >
          <Box
            sx={{
              minWidth: '11rem',
              maxWidth: '12rem'
            }}
          >
            <Typography
              sx={{
                fontSize: '12px'
              }}
            >
              Jabatan
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '12px'

            }}
          >
            {jabatan}
          </Typography>
        </Box>
        <Box
          sx={style.dataBox}
        >
          <Box
            sx={{
              minWidth: '11rem',
              maxWidth: '12rem'
            }}
          >
            <Typography
              sx={{
                fontSize: '12px'
              }}
            >
              Eselon
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '12px'
            }}
          >
            {eselon}
          </Typography>
        </Box>
        <Box
          sx={style.dataBox}
        >
          <Box
            sx={{
              minWidth: '11rem',
              maxWidth: '12rem'
            }}
          >
            <Typography
              sx={{
                fontSize: '12px'
              }}
            >
              Golongan
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '12px'
            }}
          >
            {golongan}
          </Typography>
        </Box>
        <Box
          sx={style.dataBox}
        >
          <Box
            sx={{
              minWidth: '11rem',
              maxWidth: '12rem'
            }}
          >
            <Typography
              sx={{
                fontSize: '12px'
              }}
            >
              NIP/NRP
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '12px'
            }}
          >
            {nip}
          </Typography>
        </Box>

        <Box
          sx={style.dataBox}
        >
          <Box
            sx={{
              minWidth: '11rem',
              maxWidth: '12rem'
            }}
          >
            <Typography
              sx={{
                fontSize: '12px'
              }}
            >
              Riwayat Pendidikan
            </Typography>
          </Box>
          <ol
            className={classes.list}
          >
            {
              riwayatPendidikan.map((item, index) =>
                <li
                  key={index}
                >
                  {`
                  ${item.jenjang} ${item.jurusan} (${item.nama}, ${item.tahunLulus})`
                  }
                </li>
              )
            }
          </ol>
        </Box>

        <Box
          sx={style.dataBox}
        >
          <Box
            sx={{
              minWidth: '11rem',
              maxWidth: '12rem'
            }}
          >
            <Typography
              sx={{
                fontSize: '12px'
              }}
            >
              Riwayat Jabatan
            </Typography>
          </Box>
          <ol
            className={classes.list}
          >
            {
              riwayatJabatan.map((item) => {
                <li>
                  {
                    item.jabatan
                  }
                </li>
              })
            }
          </ol>
        </Box>

        <Box
          sx={style.dataBox}
        >
          <Box
            sx={{
              minWidth: '11rem',
              maxWidth: '12rem'
            }}
          >
            <Typography
              sx={{
                fontSize: '12px'
              }}
            >
              Riwayat Pelatihan Struktural
            </Typography>
          </Box>
          <ol
            className={classes.list}
          >
            {
              pelatihanStruktural.map((data, index) =>
                <li
                  key={`struktural_${index + 1}`}
                >
                  {data.pelatihan}
                </li>
              )
            }
          </ol>
        </Box>

        <Box
          sx={style.dataBox}
        >
          <Box
            sx={{
              minWidth: '11rem',
              maxWidth: '12rem'
            }}
          >
            <Typography
              sx={{
                fontSize: '12px'
              }}
            >
              Riwayat Pelatihan Fungsional
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '12px'
            }}
          >
            {pelatihanFungsional}
          </Typography>
        </Box>
        <Box
          sx={style.dataBox}
        >
          <Box
            sx={{
              minWidth: '11rem',
              maxWidth: '12rem'
            }}
          >
            <Typography
              sx={{
                fontSize: '12px'
              }}
            >
              Riwayat Pelatihan Teknis
            </Typography>
          </Box>
          <ol
            className={classes.list}
          >
            {
              pelatihanTeknis.map((item, index) =>
                <li
                  key={`teknis ${index + 1}`}
                >
                  {item.pelatihan}
                </li>
              )
            }
          </ol>
        </Box>
        <Box
          sx={style.dataBox}
        >
          <Box
            sx={{
              minWidth: '11rem',
              maxWidth: '12rem'
            }}
          >
            <Typography
              sx={{
                fontSize: '12px'
              }}
            >
              Riwayat Catatan
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '12px'
            }}
          >
            {riwayatCatatan}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

ListDataPegawai.propTypes = {
  imageSource: PropTypes.string,
  name: PropTypes.string,
  eselon: PropTypes.string,
  jabatan: PropTypes.string,
  golongan: PropTypes.string,
  nip: PropTypes.string,
  riwayatPendidikan: PropTypes.array,
  riwayatJabatan: PropTypes.array,
  pelatihanStruktural: PropTypes.array,
  pelatihanFungsional: PropTypes.string,
  pelatihanTeknis: PropTypes.array,
  riwayatCatatan: PropTypes.string,
  index: PropTypes.number
}

export default ListDataPegawai
